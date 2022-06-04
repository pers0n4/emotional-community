import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Genre } from "../genres/entities/genre.entity";

import { Track } from "./entities/track.entity";
import { TracksController } from "./tracks.controller";
import { TracksService } from "./tracks.service";

@Module({
  imports: [TypeOrmModule.forFeature([Track, Genre])],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
