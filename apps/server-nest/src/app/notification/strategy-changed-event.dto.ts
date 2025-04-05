import { IsNotEmpty, IsString } from "class-validator";

export class StrategyChangedEventDto {
  @IsString()
  @IsNotEmpty()
  newStrategy: string;
}
