import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IMedia } from "../interface/media.interface";

class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  media: IMedia;
}

class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  media?: IMedia;
}

export { CreateCategoryDto, UpdateCategoryDto };
