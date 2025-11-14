import { IsNotEmpty, IsUUID } from "class-validator";

class WishListDTO {
  @IsUUID()
  @IsNotEmpty()
  bookId: string;
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}

export { WishListDTO };
