import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";
import { Article } from "./entities/article.entity";
import { Comment } from "./entities/comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Article, Comment])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
