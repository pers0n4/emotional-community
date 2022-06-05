import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";

import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { TracksService } from "./tracks.service";

@Controller("tracks")
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll(@Query("genre") genre: string) {
    if (genre) {
      return this.tracksService.findByGenre(genre);
    }
    return this.tracksService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tracksService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(+id, updateTrackDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tracksService.remove(+id);
  }
}
