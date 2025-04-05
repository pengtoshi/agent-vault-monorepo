import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "체인 정보" })
export class ChainInfo {
  @Field(() => Int, { nullable: false, description: "체인 ID" })
  chainId!: number;

  @Field(() => String, { nullable: false, description: "이름" })
  name!: string;

  @Field(() => Date, { nullable: false, description: "생성 일시" })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: "수정 일시" })
  updatedAt!: Date;
}
