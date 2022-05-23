import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { User } from "../users/entities/user.entity";

import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createArticleDto: CreateArticleDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.articlesService.create(createArticleDto, currentUser);
  }

  @Get()
  asyncfindAll() {
    return this.articlesService.findAll();
  }

  @Get(":slug")
  async findOne(@Param("slug") slug: string) {
    return this.articlesService.findOne(+slug);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":slug")
  async update(
    @Param("slug") slug: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(+slug, updateArticleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":slug")
  async remove(@Param("slug") slug: string) {
    return this.articlesService.remove(+slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":slug/comments")
  async createComment(
    @Param("slug") slug,
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.articlesService.createComment(
      slug,
      createCommentDto,
      currentUser,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":slug/comments/:id")
  async deleteComment(@Param() params) {
    const { slug, id } = params;
    return this.articlesService.deleteComment(slug, id);
  }
}
