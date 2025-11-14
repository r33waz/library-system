import { IsNotEmpty, IsUUID } from "class-validator";

class RatingDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  rating: number;
}

export default RatingDto;
