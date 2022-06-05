import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {
  APP_FILTER,
  APP_INTERCEPTOR,
  APP_PIPE,
  RouterModule,
} from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CommentsModule } from "./comments/comments.module";
import { HttpExceptionFilter } from "./common/filter/http-exception.filter";
import { GenresModule } from "./genres/genres.module";
import { TracksModule } from "./tracks/tracks.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "./test.db",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      logging: true,
    }),
    ScheduleModule.forRoot(),
    RouterModule.register([
      {
        path: "api",
        children: [
          UsersModule,
          AuthModule,
          GenresModule,
          TracksModule,
          CommentsModule,
        ],
      },
    ]),
    UsersModule,
    AuthModule,
    GenresModule,
    TracksModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
