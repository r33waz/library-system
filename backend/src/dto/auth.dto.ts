import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
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
  @Matches(/^[A-Za-z0-9.]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, {
    message:
      "Email must not contain special characters like !  # $ % ^ & * _ - + = < >.",
  })
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
