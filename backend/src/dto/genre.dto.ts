import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IMedia } from "../interface/media.interface";

class GenreDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  media: IMedia;
}

class UpdateGenreDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  media?: IMedia;
}
export { GenreDto, UpdateGenreDto };
