import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { IMedia } from "../interface/media.interface";

class LibraryDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmpty()
  @IsString()
  name: string;

  @IsEmpty()
  @IsString()
  description: string;

  @IsEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsEmpty()
  @IsString()
  city: string;

  @IsEmpty()
  @IsString()
  street: string;

  @IsEmpty()
  @IsString()
  state: string;

  @IsOptional()
  media: IMedia;
}

export { LibraryDto };
