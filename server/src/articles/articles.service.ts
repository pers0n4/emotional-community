import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "../users/entities/user.entity";

import { CreateArticleDto } from "./dto/create-article.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article } from "./entities/article.entity";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async create(createArticleDto: CreateArticleDto, user: User) {
    return this.articlesRepository.save({ ...createArticleDto, user });
  }

  async findAll() {
    return this.articlesRepository.find({ loadEagerRelations: false });
  }

  async findOne(slug: number) {
    return this.articlesRepository.findOne(slug);
  }

  async update(slug: number, updateArticleDto: UpdateArticleDto) {
    return this.articlesRepository.update(slug, updateArticleDto);
  }

  async remove(slug: number) {
    return this.articlesRepository.delete(slug);
  }

  async createComment(
    slug: number,
    createCommentDto: CreateCommentDto,
    user: User,
  ) {
    const article = await this.articlesRepository.findOne({ id: slug });
    const comment = await this.commentsRepository.save({
      ...createCommentDto,
      user,
      // article,
    });

    article.comments.push(comment);

    await this.commentsRepository.save(comment);
    return this.articlesRepository.save(article);
    // return this.articlesRepository.save({
    //   ...article,
    //   comments: [...article.comments, comment],
    // });
  }
  async deleteComment(slug: number, id: number) {
    const article = await this.articlesRepository.findOne({ id: slug });
    const comment = await this.commentsRepository.findOne(id);
    const deleteIndex = article.comments.findIndex(
      (_comment) => _comment.id === comment.id,
    );

    if (deleteIndex >= 0) {
      const deleteComments = article.comments.splice(deleteIndex, 1);
      await this.commentsRepository.delete(deleteComments[0].id);
      await this.articlesRepository.save(article);
    }
  }
}
