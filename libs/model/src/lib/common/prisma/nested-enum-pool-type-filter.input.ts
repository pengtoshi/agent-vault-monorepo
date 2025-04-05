import { Field, InputType } from "@nestjs/graphql";
import { PoolType } from "../dtos/enum/pool-type.enum";

@InputType()
export class NestedEnumPoolTypeFilter {
  @Field(() => PoolType, { nullable: true })
  equals?: keyof typeof PoolType;

  @Field(() => [PoolType], { nullable: true })
  in?: Array<keyof typeof PoolType>;

  @Field(() => [PoolType], { nullable: true })
  notIn?: Array<keyof typeof PoolType>;

  @Field(() => NestedEnumPoolTypeFilter, { nullable: true })
  not?: NestedEnumPoolTypeFilter;
}
