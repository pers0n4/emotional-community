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

  async create({ email, password }: CreateUserDto) {
    try {
      const hash = await bcrypt.hash(password, this.saltOrRounds);
      const user = await this.usersRepository.save({
        email,
        password: hash,
      });
      return this.usersRepository.findOneBy({ id: user.id });
    } catch (error) {
      throw new ConflictException("User already exists", error.message);
    }
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    try {
      return await this.usersRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException("User not found", error.message);
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.usersRepository.findOneByOrFail({ email });
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
      return await this.usersRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException("User not found", error.message);
    }
  }

  async remove(idOrUser: number | User) {
    try {
      const user =
        typeof idOrUser === "number"
          ? await this.usersRepository.findOneBy({ id: idOrUser })
          : idOrUser;
      return await this.usersRepository.remove(user);
    } catch (error) {
      throw new NotFoundException("User not found", error.message);
    }
  }
}
