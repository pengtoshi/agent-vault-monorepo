import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Chain Model" })
export class ChainInfo {
  @Field(() => String, { nullable: false, description: "Chain ID" })
  chainId!: string;

  @Field(() => String, { nullable: false, description: "Chain name" })
  name!: string;

  @Field(() => String, { nullable: false, description: "Chain block explorer URL" })
  blockExplorerUrl!: string;

  @Field(() => Date, { nullable: false, description: "Created date" })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: "Last updated date" })
  updatedAt!: Date;
}
