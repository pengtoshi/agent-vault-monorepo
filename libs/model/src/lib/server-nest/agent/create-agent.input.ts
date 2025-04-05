import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateAgentInput {
  @Field(() => String, { nullable: false, description: "Agent name" })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field(() => String, { nullable: false, description: "Agent description" })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @Field(() => String, { nullable: false, description: "Agent vault address" })
  @IsString()
  @IsNotEmpty()
  vaultAddress!: string;

  @Field(() => String, { nullable: false, description: "Agent prompt" })
  @IsString()
  @IsNotEmpty()
  prompt!: string;

  @Field(() => Int, { nullable: false, description: "Chain ID" })
  @IsInt()
  @IsNotEmpty()
  chainId!: number;

  // TODO: Add more fields
}
