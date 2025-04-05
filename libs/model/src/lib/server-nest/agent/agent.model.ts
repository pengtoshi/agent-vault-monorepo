import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Agent Model" })
export class AgentInfo {
  @Field(() => String, { nullable: false, description: "Agent ID" })
  id!: string;

  @Field(() => String, { nullable: false, description: "Agent EOA address" })
  address!: string;

  @Field(() => String, { nullable: false, description: "Agent vault address" })
  vaultAddress!: string;

  @Field(() => Int, { nullable: false, description: "Agent vault deposit number" })
  vaultDepositNumber!: number;

  @Field(() => Float, { nullable: false, description: "Agent vault deposit amount" })
  vaultDepositAmount!: number;

  @Field(() => String, { nullable: false, description: "Agent token address" })
  tokenAddress!: string;

  @Field(() => String, { nullable: false, description: "Agent name" })
  name!: string;

  @Field(() => String, { nullable: false, description: "Agent description" })
  description!: string;

  @Field(() => String, { nullable: false, description: "Chain ID" })
  chainId!: string;

  @Field(() => String, { nullable: false, description: "Agent prompt" })
  prompt!: string;

  @Field(() => Int, { nullable: false, description: "Agent risk level" })
  riskLevel!: number;

  @Field(() => Date, { nullable: false, description: "Created date" })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: "Last updated date" })
  updatedAt!: Date;
}
