import { Injectable } from "@nestjs/common";
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
    const hash = await bcrypt.hash(password, this.saltOrRounds);
    return this.usersRepository.save({
      username,
      password: hash,
    });
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  async findOneByUsername(username: string) {
    return this.usersRepository.findOne({ username });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    this.usersRepository.delete(id);
  }
}
