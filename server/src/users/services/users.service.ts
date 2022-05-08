import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
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