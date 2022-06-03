import { Transform } from "class-transformer";
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

  @Transform(({ value }) => JSON.parse(value))
  @Column({ nullable: true })
  detectedEntities: string;

  @Column({ nullable: true })
  detectedSentiment: string;

  @Transform(({ value }) => JSON.parse(value))
  @Column({ nullable: true })
  detectedSentimentScore: string;

  @Column({ nullable: true })
  confirmedEntities: string;

  @Column({ nullable: true })
  confirmedSentiment: string;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn()
  user: User;

  @OneToMany(() => Comment, (comment) => comment.article, { eager: true })
  comments: Comment[];
}
