import { Field, Float, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class DepositAgentInput {
  @Field(() => String, { nullable: false, description: "Agent ID" })
  @IsString()
  @IsNotEmpty()
  agentId!: string;

  @Field(() => Float, { nullable: false, description: "Deposit amount" })
  @IsNumber()
  @IsNotEmpty()
  depositAmount!: number;
}
