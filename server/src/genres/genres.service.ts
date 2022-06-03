import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateGenreDto } from "./dto/create-genre.dto";
import { UpdateGenreDto } from "./dto/update-genre.dto";
import { Genre } from "./entities/genre.entity";

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>,
  ) {}

  async create(createGenreDto: CreateGenreDto) {
    return this.genresRepository.save({
      ...createGenreDto,
    });
  }

  async findAll() {
    return this.genresRepository.find();
  }

  async findOne(id: number) {
    return this.genresRepository.findOne(id);
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    return this.genresRepository.update(id, updateGenreDto);
  }

  async remove(id: number) {
    return this.genresRepository.delete(id);
  }
}
