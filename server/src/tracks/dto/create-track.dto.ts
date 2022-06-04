import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly artist: string;

  @IsNumber()
  @IsNotEmpty()
  readonly genreId: number;
}
