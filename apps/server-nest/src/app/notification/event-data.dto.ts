import { IsNotEmpty, IsObject } from "class-validator";

export class EventDataDto {
  @IsObject()
  @IsNotEmpty()
  message: Record<string, any>;
}
