import { Exclude } from "class-transformer";
import { IsEmail } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Comment } from "../../comments/entities/comment.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Comment, (comment) => comment.user, { eager: true })
  comments: Comment[];
}
