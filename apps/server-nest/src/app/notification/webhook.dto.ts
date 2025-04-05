import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { EventDataDto } from "./event-data.dto";

export class WebhookDto {
  @IsString()
  @IsNotEmpty()
  eventType: string;

  @IsObject()
  @IsNotEmpty()
  event: EventDataDto;
}
