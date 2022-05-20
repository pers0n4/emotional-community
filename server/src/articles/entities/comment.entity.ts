import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "../../users/entities/user.entity";

import { Article } from "./article.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Article, (article) => article.comments)
  @JoinColumn()
  article: Article;
}
