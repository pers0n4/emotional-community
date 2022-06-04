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

import { CreateGenreDto } from "./dto/create-genre.dto";
import { UpdateGenreDto } from "./dto/update-genre.dto";
import { GenresService } from "./genres.service";

@Controller("genres")
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @Get()
  findAll(@Query("name") name: string) {
    if (name) {
      return this.genresService.findByName(name);
    } else {
      return this.genresService.findAll();
    }
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.genresService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(+id, updateGenreDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.genresService.remove(+id);
  }
}
