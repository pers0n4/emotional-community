import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column()
  genreId: number;

  @ManyToOne(() => Genre, (genre) => genre.tracks)
  @JoinColumn({ name: "genreId" })
  genre: Genre;

  @OneToMany(() => Comment, (comment) => comment.track, { eager: true })
  comments: Comment[];
}
