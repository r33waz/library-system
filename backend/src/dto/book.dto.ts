import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from "class-validator";
import { IMedia } from "../interface/media.interface";

class BookDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  genre: string;

  @IsNotEmpty()
  @IsInt()
  rating: number;

  @IsNotEmpty()
  coverImage: string;

  @IsNotEmpty()
  coverColor: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsInt()
  totalCopies: number;

  @IsNotEmpty()
  @IsInt()
  availableCopies: number;

  @IsOptional()
  neplaiVideoUrl: string;

  @IsOptional()
  englishVideoUrl: string;

  @IsOptional()
  hindiVideoUrl: string;

  @IsNotEmpty()
  summary: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  media: IMedia[];
}

export default BookDto;
