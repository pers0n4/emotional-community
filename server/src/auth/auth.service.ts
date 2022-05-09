import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/services/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async token(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      token_type: "Bearer",
      expires_in: 3600,
    };
  }
}
