import { IsNotEmpty, IsUUID } from "class-validator";

class RolerequestDto {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  requestedRole: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  reason: string;

  @IsUUID()
  userId: string;
}
