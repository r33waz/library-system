import { IsNotEmpty, IsString, IsUUID } from "class-validator";

class BorrowRequestDto {
  @IsUUID()
  @IsNotEmpty()
  bookId: string;

  @IsUUID()
  @IsNotEmpty()
  libraryId: string;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;
}

export default BorrowRequestDto;
