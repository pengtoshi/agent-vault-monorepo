import { Field, InputType } from "@nestjs/graphql";
import { NestedEnumTransactionTypeFilter } from "./nested-enum-transaction-type-filter.input";
import { TransactionType } from "../dtos/enum/transaction-type.enum";

@InputType()
export class EnumTransactionTypeFilter {
  @Field(() => TransactionType, { nullable: true })
  equals?: keyof typeof TransactionType;

  @Field(() => [TransactionType], { nullable: true })
  in?: Array<keyof typeof TransactionType>;

  @Field(() => [TransactionType], { nullable: true })
  notIn?: Array<keyof typeof TransactionType>;

  @Field(() => NestedEnumTransactionTypeFilter, { nullable: true })
  not?: NestedEnumTransactionTypeFilter;
}
