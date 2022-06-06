import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  readonly body: string;

  @IsNumber()
  @IsNotEmpty()
  readonly trackId: number;
}
