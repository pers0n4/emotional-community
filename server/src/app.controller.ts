import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";

import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt.guard";
import { LocalAuthGuard } from "./auth/local.guard";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post("auth/token")
  async token(@Request() request) {
    return this.authService.token(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("auth/token")
  getProfile(@Request() request) {
    return request.user;
  }
}
