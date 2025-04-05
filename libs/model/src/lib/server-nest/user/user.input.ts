import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsEthereumAddress, IsOptional } from "class-validator";

@InputType()
export class UserInput {
  @Field(() => String, { nullable: true, description: "지갑 주소" })
  @IsEthereumAddress()
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  address?: string;
}
