import { Injectable, Logger } from "@nestjs/common";
import { DataSource } from "typeorm";

import { Genre } from "./genres/entities/genre.entity";
import { genres, tracks } from "./seeds";
import { Track } from "./tracks/entities/track.entity";

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private dataSource: DataSource) {}

  getHello(): string {
    return "Hello World!";
  }

  async initialize() {
    await this.initializeGenre();
    await this.initializeTrack();
  }

  async initializeGenre() {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(
        genres.map(({ name, path }) => {
          const genre = new Genre();
          genre.name = name;
          genre.path = path;
          return genre;
        }),
      );

      await queryRunner.commitTransaction();
      this.logger.verbose("Genres created");
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async initializeTrack() {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const genreModels = await queryRunner.manager.find(Genre);

      await queryRunner.manager.save(
        tracks.map(({ title, artist, genres: genreNames }) => {
          const track = new Track();
          track.title = title;
          track.artist = artist;
          track.genreId = genreModels.find(
            (genre) => genre.name === genreNames[0],
          ).id;
          return track;
        }),
      );

      await queryRunner.commitTransaction();
      this.logger.verbose("Tracks created");
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
