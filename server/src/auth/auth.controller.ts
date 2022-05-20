import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";

import { User } from "../users/entities/user.entity";

import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { LocalAuthGuard } from "./guards/local.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("token")
  async token(@Request() request) {
    return this.authService.sign(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("token")
  validate(@CurrentUser() user: User) {
    return user;
  }
}
