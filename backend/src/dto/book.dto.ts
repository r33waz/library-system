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

class UpdateBookDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  title: string;

  @IsOptional()
  author: string;

  @IsOptional()
  genre: string;

  @IsOptional()
  @IsInt()
  rating: number;

  @IsOptional()
  coverImage: string;

  @IsOptional()
  coverColor: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsInt()
  totalCopies: number;

  @IsOptional()
  @IsInt()
  availableCopies: number;

  @IsOptional()
  neplaiVideoUrl: string;

  @IsOptional()
  englishVideoUrl: string;

  @IsOptional()
  hindiVideoUrl: string;

  @IsOptional()
  summary: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsOptional()
  media: IMedia[];
}

export { BookDto, UpdateBookDto };
