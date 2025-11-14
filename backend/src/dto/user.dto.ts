import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { IMedia } from "../interface/media.interface";
import { RemoveEmptyString } from "../utils/removeEmptyString";

class UserDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  middlename: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  universityId: string;

  @IsDate()
  lastActivityDate: Date = new Date();

  @IsDate()
  createdAt: Date = new Date();

  @IsOptional()
  media: IMedia[];
}

class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @RemoveEmptyString()
  firstname?: string;

  @IsOptional()
  @IsString()
  @RemoveEmptyString()
  middlename?: string;

  @IsOptional()
  @IsString()
  @RemoveEmptyString()
  lastname?: string;

  @IsOptional()
  @IsString()
  @RemoveEmptyString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  universityId?: string;

  @IsOptional()
  @RemoveEmptyString()
  media: IMedia[];
}

export { UpdateUserDTO, UserDTO };
