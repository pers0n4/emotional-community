import { Exclude } from "class-transformer";
import { IsEmail } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Article } from "../../articles/entities/article.entity";
import { Comment } from "../../articles/entities/comment.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Article, (article) => article.user, { eager: true })
  articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.user, { eager: true })
  comments: Comment[];
}
