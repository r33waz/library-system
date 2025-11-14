import { IsNotEmpty, IsString } from "class-validator";
import { IMedia } from "../interface/media.interface";

class GenreDto {
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    media: IMedia
}

class UpdateGenreDto {
    @IsNotEmpty()
    @IsString()
    name:string
}
export { GenreDto, UpdateGenreDto };
