import { Exclude, Transform } from "class-transformer";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Track } from "../../tracks/entities/track.entity";
import { User } from "../../users/entities/user.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

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

  @ManyToOne(() => Track, (track) => track.comments)
  @JoinColumn()
  track: Track;

  @Exclude()
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  user: User;
}
