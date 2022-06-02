import { IsNotEmpty, IsString } from "class-validator";

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly path: string;
}
