import { readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { basename, join } from "node:path";

import { Injectable, Logger } from "@nestjs/common";
import { DataSource } from "typeorm";
import { parse } from "yaml";

import { CommentsService } from "./comments/comments.service";
import { Comment } from "./comments/entities/comment.entity";
import { Genre } from "./genres/entities/genre.entity";
import { genres, tracks } from "./seeds";
import { Track } from "./tracks/entities/track.entity";
import { User } from "./users/entities/user.entity";

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly commentsService: CommentsService,
  ) {}

  getHello(): string {
    return "Hello World!";
  }

  async initialize() {
    await this.initializeGenre();
    await this.initializeTrack();
    await this.initializeComment();
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

  async initializeComment() {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const trackModels = await queryRunner.manager.find(Track);

      const seedDirectory = join(process.cwd(), "./server/seeds");
      const fileNames = await readdir(seedDirectory);
      const filePaths = fileNames.map((fileName) =>
        join(seedDirectory, fileName),
      );

      const comments = filePaths.flatMap((filePath) => {
        const title = basename(filePath, ".yaml");
        const trackId = trackModels.find((track) => track.title === title).id;

        const text = readFileSync(filePath, "utf8");
        const commentBodies: string[] = parse(text);

        return commentBodies.map((body) => {
          const comment = new Comment();
          comment.body = body;
          comment.trackId = trackId;
          return comment;
        })[0];
      });

      const user = new User();
      user.email = "test@example.org";
      user.password = "test";
      await queryRunner.manager.save(user);

      const shouldAnalyze = false;
      if (shouldAnalyze) {
        await Promise.all(
          comments.map(async (comment) =>
            this.commentsService.create(comment, user),
          ),
        );
      } else {
        await queryRunner.manager.save(comments);
      }

      await queryRunner.commitTransaction();
      this.logger.verbose("Comments created");
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
