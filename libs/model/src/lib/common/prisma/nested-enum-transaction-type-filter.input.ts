import { Field, InputType } from "@nestjs/graphql";
import { TransactionType } from "../dtos/enum/transaction-type.enum";

@InputType()
export class NestedEnumTransactionTypeFilter {
  @Field(() => TransactionType, { nullable: true })
  equals?: keyof typeof TransactionType;

  @Field(() => [TransactionType], { nullable: true })
  in?: Array<keyof typeof TransactionType>;

  @Field(() => [TransactionType], { nullable: true })
  notIn?: Array<keyof typeof TransactionType>;

  @Field(() => NestedEnumTransactionTypeFilter, { nullable: true })
  not?: NestedEnumTransactionTypeFilter;
}
