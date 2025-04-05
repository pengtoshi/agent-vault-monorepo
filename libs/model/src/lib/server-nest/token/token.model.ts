import { Field, Float, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "토큰 정보" })
export class TokenInfo {
  @Field(() => ID, { nullable: false, description: "아이디" })
  id!: string;

  @Field(() => String, { nullable: false, description: "토큰 주소" })
  address!: string;

  @Field(() => Int, { nullable: false, description: "체인 ID" })
  chainId!: number;

  @Field(() => String, { nullable: false, description: "이름" })
  name!: string;

  @Field(() => String, { nullable: false, description: "심볼" })
  symbol!: string;

  @Field(() => Int, { nullable: false, description: "자리수" })
  decimals!: number;

  @Field(() => String, { nullable: false, description: "로고 URL" })
  logoUrl!: string;

  @Field(() => Float, { nullable: false, description: "가격" })
  price!: number;

  @Field(() => Date, { nullable: false, description: "생성 일시" })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: "수정 일시" })
  updatedAt!: Date;
}
