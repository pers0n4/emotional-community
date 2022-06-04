import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Track } from "../../tracks/entities/track.entity";

@Entity("genres")
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  path: string;

  @ManyToMany(() => Track, (track) => track.genres)
  tracks: Track[];
}
