import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsEthereumAddress, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { ChainInput } from "./chain.input";

@InputType()
export class TokenInput {
  @Field(() => String, { nullable: true, description: "아이디" })
  @IsString()
  @IsOptional()
  id?: string;

  @Field(() => String, { nullable: false, description: "토큰 주소" })
  @IsEthereumAddress()
  address!: string;

  @Field(() => String, { nullable: false, description: "이름" })
  @IsString()
  name!: string;

  @Field(() => String, { nullable: false, description: "심볼" })
  @IsString()
  symbol!: string;

  @Field(() => Number, { nullable: false, description: "자리수" })
  @IsInt()
  decimals!: number;

  @Field(() => String, { nullable: false, description: "로고 URL" })
  @IsString()
  logoUrl!: string;

  @Field(() => Number, { nullable: false, description: "가격" })
  @IsNumber()
  price!: number;

  @ValidateNested()
  @Type(() => ChainInput)
  @Field(() => ChainInput, { nullable: false, description: "체인 입력값" })
  chain!: ChainInput;
}
