import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Genre } from "../genres/entities/genre.entity";

import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { Track } from "./entities/track.entity";

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.tracksRepository.save({
      ...createTrackDto,
      genres: await Promise.all(
        createTrackDto.genres.map((genre) =>
          this.genresRepository.findOneBy(genre),
        ),
      ),
    });

    return this.tracksRepository.findOneBy({
      id: track.id,
    });
  }

  async findAll() {
    return this.tracksRepository.find({
      loadEagerRelations: false,
    });
  }

  async findOne(id: number) {
    return this.tracksRepository.findOneBy({ id });
  }

  async update(id: number, updateTrackDto: UpdateTrackDto) {
    return this.tracksRepository.update(id, updateTrackDto);
  }

  async remove(id: number) {
    return this.tracksRepository.delete(id);
  }
}
