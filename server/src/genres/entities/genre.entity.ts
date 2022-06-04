import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Track } from "../../tracks/entities/track.entity";

@Entity("genres")
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  path: string;

  @OneToMany(() => Track, (track) => track.genre)
  tracks: Track[];
}
