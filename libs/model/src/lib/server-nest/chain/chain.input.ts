import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsString } from "class-validator";

@InputType()
export class ChainInput {
  @Field(() => Int, { nullable: false, description: "체인 ID" })
  @IsInt()
  chainId!: number;

  @Field(() => String, { nullable: false, description: "이름" })
  @IsString()
  name!: string;
}
