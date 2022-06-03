import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly artist: string;

  @IsNumber()
  @IsNotEmpty()
  readonly genreId: number;
}
