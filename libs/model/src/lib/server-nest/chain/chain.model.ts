import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Chain Model" })
export class Chain {
  @Field(() => String, { nullable: false, description: "Chain ID" })
  chainId!: string;

  @Field(() => String, { nullable: false, description: "Chain name" })
  name!: string;

  @Field(() => Date, { nullable: false, description: "Created date" })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: "Last updated date" })
  updatedAt!: Date;
}
