import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly artist: string;

  @IsOptional()
  readonly genreIds: number[];

  @IsOptional()
  readonly genreNames: string[];

  get genres() {
    return (
      this.genreIds?.map((id) => ({ id })) ??
      this.genreNames?.map((name) => ({ name }))
    );
  }
}
