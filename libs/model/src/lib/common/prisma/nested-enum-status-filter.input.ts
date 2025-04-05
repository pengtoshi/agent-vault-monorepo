import { Field, InputType } from "@nestjs/graphql";
import { Status } from "../dtos/enum/status.enum";

@InputType()
export class NestedEnumStatusFilter {
  @Field(() => Status, { nullable: true })
  equals?: keyof typeof Status;

  @Field(() => [Status], { nullable: true })
  in?: Array<keyof typeof Status>;

  @Field(() => [Status], { nullable: true })
  notIn?: Array<keyof typeof Status>;

  @Field(() => NestedEnumStatusFilter, { nullable: true })
  not?: NestedEnumStatusFilter;
}
