import {
  ComprehendClient,
  DetectEntitiesCommand,
  DetectEntitiesCommandOutput,
  DetectSentimentCommand,
  DetectSentimentCommandOutput,
} from "@aws-sdk/client-comprehend";
import { Injectable, Logger } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
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
  private readonly logger = new Logger(ArticlesService.name);
  private readonly client = new ComprehendClient({
    region: "ap-northeast-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async create(createArticleDto: CreateArticleDto, user: User) {
    const article = await this.articlesRepository.save({
      ...createArticleDto,
      user,
    });

    this.schedulerRegistry.addTimeout(
      `article-${article.id}`,
      this.analyzeText(article),
    );

    return article;
  }

  async analyzeText(article: Article) {
    const input = {
      Text: article.content,
      LanguageCode: "ko",
    };

    const commands = [DetectSentimentCommand, DetectEntitiesCommand].map(
      (Command) => new Command(input),
    ) as [DetectSentimentCommand, DetectEntitiesCommand];

    return setTimeout(async () => {
      this.logger.log("AWS Comprehend");

      const [{ Sentiment, SentimentScore }, { Entities }] = (await Promise.all(
        commands.map((command) => this.client.send(command as any)),
      )) as [DetectSentimentCommandOutput, DetectEntitiesCommandOutput];

      article.detectedSentimentScore = JSON.stringify(SentimentScore);
      article.detectedSentiment = Sentiment;
      article.confirmedSentiment = Sentiment;

      article.detectedEntities = JSON.stringify(Entities);
      article.confirmedEntities = Entities.map(({ Text }) => Text).toString();

      this.articlesRepository.save(article);
    }, 100);
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
