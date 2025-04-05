import { Field, InputType } from "@nestjs/graphql";
import { NestedEnumStatusFilter } from "./nested-enum-status-filter.input";
import { Status } from "../dtos/enum/status.enum";

@InputType()
export class EnumStatusFilter {
  @Field(() => Status, { nullable: true })
  equals?: keyof typeof Status;

  @Field(() => [Status], { nullable: true })
  in?: Array<keyof typeof Status>;

  @Field(() => [Status], { nullable: true })
  notIn?: Array<keyof typeof Status>;

  @Field(() => NestedEnumStatusFilter, { nullable: true })
  not?: NestedEnumStatusFilter;
}
