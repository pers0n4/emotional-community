import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Genre } from "../../genres/entities/genre.entity";

@Entity("tracks")
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  artist: string;

  @Column()
  genreId: number;

  @ManyToOne(() => Genre, (genre) => genre.tracks)
  @JoinColumn({ name: "genreId" })
  genre: Genre;
}
