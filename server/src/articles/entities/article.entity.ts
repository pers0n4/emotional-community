import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "../../users/entities/user.entity";

import { Comment } from "./comment.entity";

@Entity("articles")
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn()
  user: User;

  @OneToMany(() => Comment, (comment) => comment.article, { eager: true })
  comments: Comment[];
}
