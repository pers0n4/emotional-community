import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";

import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";
@Injectable()
export class UsersService {
  private saltOrRounds: number;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    this.saltOrRounds = 10;
  }

  async create({ username, password }: CreateUserDto) {
    try {
      const hash = await bcrypt.hash(password, this.saltOrRounds);
      return await this.usersRepository.save({
        username,
        password: hash,
      });
    } catch (error) {
      throw new ConflictException("User already exists", error.message);
    }
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    try {
      return await this.usersRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException("User not found", error.message);
    }
  }

  async findOneByUsername(username: string) {
    try {
      return await this.usersRepository.findOneOrFail({ username });
    } catch (error) {
      throw new NotFoundException("User not found", error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { password } = updateUserDto;
      await this.usersRepository.update(
        id,
        password
          ? {
              ...updateUserDto,
              password: await bcrypt.hash(password, this.saltOrRounds),
            }
          : updateUserDto,
      );
      return await this.usersRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException("User not found", error.message);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.usersRepository.findOne(id);
      return await this.usersRepository.remove(user);
    } catch (error) {
      throw new NotFoundException("User not found", error.message);
    }
  }
}
