import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { LocalAuthGuard } from "./guards/local.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("token")
  async token(@Request() request) {
    return this.authService.token(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("token")
  getProfile(@Request() request) {
    return request.user;
  }
}
