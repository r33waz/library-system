import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { IMedia } from "../interface/media.interface";

class LibraryEmpDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsString()
  @IsOptional()
  middlename: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsOptional()
  media: IMedia;
}

export default LibraryEmpDto;
