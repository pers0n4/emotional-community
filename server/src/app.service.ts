import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import { Genre } from "./genres/entities/genre.entity";
import { genres } from "./seeds";

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

  getHello(): string {
    return "Hello World!";
  }

  async initialize() {
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
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
