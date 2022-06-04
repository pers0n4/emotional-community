import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Comment } from "../../comments/entities/comment.entity";
import { Genre } from "../../genres/entities/genre.entity";

@Entity("tracks")
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @ManyToMany(() => Genre, (genre) => genre.tracks)
  @JoinTable()
  genres: Genre[];

  @OneToMany(() => Comment, (comment) => comment.track, { eager: true })
  comments: Comment[];
}
