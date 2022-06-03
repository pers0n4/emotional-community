import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { Track } from "./entities/track.entity";

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.tracksRepository.save({
      ...createTrackDto,
      genre: {
        id: createTrackDto.genreId,
      },
    });

    return this.tracksRepository.findOne(track.id);
  }

  async findAll() {
    return this.tracksRepository.find();
  }

  async findOne(id: number) {
    return this.tracksRepository.findOne(id);
  }

  async update(id: number, updateTrackDto: UpdateTrackDto) {
    return this.tracksRepository.update(id, updateTrackDto);
  }

  async remove(id: number) {
    return this.tracksRepository.delete(id);
  }
}
