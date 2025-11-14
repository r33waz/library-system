import { IsString } from "class-validator";

class InqueryDto {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  number: string;
  @IsString()
  message: string;
}

export default InqueryDto;
