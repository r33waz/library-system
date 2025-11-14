import { IsNotEmpty, IsString } from "class-validator";

class CategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
export { CategoryDto, UpdateCategoryDto };
