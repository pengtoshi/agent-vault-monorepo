import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Agent Model" })
export class AgentInfo {
  @Field(() => String, { nullable: false, description: "Agent ID" })
  id!: string;

  @Field(() => String, { nullable: false, description: "Agent EOA address" })
  address!: string;

  @Field(() => String, { nullable: false, description: "Agent vault address" })
  vaultAddress!: string;

  @Field(() => String, { nullable: false, description: "Agent name" })
  name!: string;

  @Field(() => String, { nullable: false, description: "Agent description" })
  description!: string;

  @Field(() => Int, { nullable: false, description: "Chain ID" })
  chainId!: number;

  @Field(() => String, { nullable: false, description: "Agent prompt" })
  prompt!: string;

  @Field(() => Date, { nullable: false, description: "Created date" })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: "Last updated date" })
  updatedAt!: Date;
}
