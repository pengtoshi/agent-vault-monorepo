import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NestedBoolFilter {
  @Field(() => Boolean, { nullable: true })
  equals?: boolean;

  @Field(() => NestedBoolFilter, { nullable: true })
  not?: NestedBoolFilter;
}
