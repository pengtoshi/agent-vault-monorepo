import { Field, InputType } from "@nestjs/graphql";
import { NestedEnumSupportedNetworkFilter } from "./nested-enum-supported-network-filter.input";
import { SupportedNetwork } from "../dtos/enum/supported-network.enum";

@InputType()
export class EnumSupportedNetworkFilter {
  @Field(() => SupportedNetwork, { nullable: true })
  equals?: keyof typeof SupportedNetwork;

  @Field(() => [SupportedNetwork], { nullable: true })
  in?: Array<keyof typeof SupportedNetwork>;

  @Field(() => [SupportedNetwork], { nullable: true })
  notIn?: Array<keyof typeof SupportedNetwork>;

  @Field(() => NestedEnumSupportedNetworkFilter, { nullable: true })
  not?: NestedEnumSupportedNetworkFilter;
}
