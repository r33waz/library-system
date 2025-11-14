import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNotEmpty()
  password: string;
}

class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstname: string;

  @IsOptional()
  middlename: string;

  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsOptional()
  universityCard?: string;

  @IsOptional()
  @IsInt()
  universityId?: number;
}

class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export { ForgotPasswordDto, LoginDto, SignupDto };
