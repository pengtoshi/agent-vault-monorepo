import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Strategy Model" })
export class StrategyInfo {
  @Field(() => String, { nullable: false, description: "Strategy address" })
  address!: string;

  @Field(() => String, { nullable: false, description: "Chain ID" })
  chainId!: string;

  @Field(() => String, { nullable: false, description: "Chain name" })
  name!: string;

  @Field(() => Boolean, { nullable: false, description: "Default" })
  default!: boolean;

  @Field(() => Date, { nullable: false, description: "Created date" })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: "Last updated date" })
  updatedAt!: Date;
}
