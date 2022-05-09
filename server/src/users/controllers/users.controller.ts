import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

import { CurrentUser } from "../../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";
import { UsersService } from "../services/users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: User,
  ) {
    const user = await this.usersService.findOne(+id);
    if (user.id !== currentUser.id) {
      throw new ForbiddenException("You are not allowed to update this user");
    }
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @HttpCode(204)
  async remove(@Param("id") id: string, @CurrentUser() currentUser: User) {
    const user = await this.usersService.findOne(+id);
    if (user.id !== currentUser.id) {
      throw new ForbiddenException("You are not allowed to delete this user");
    }
    return this.usersService.remove(user);
  }
}
