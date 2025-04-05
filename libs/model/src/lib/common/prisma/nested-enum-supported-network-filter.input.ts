import { Field, InputType } from "@nestjs/graphql";
import { SupportedNetwork } from "../dtos/enum/supported-network.enum";

@InputType()
export class NestedEnumSupportedNetworkFilter {
  @Field(() => SupportedNetwork, { nullable: true })
  equals?: keyof typeof SupportedNetwork;

  @Field(() => [SupportedNetwork], { nullable: true })
  in?: Array<keyof typeof SupportedNetwork>;

  @Field(() => [SupportedNetwork], { nullable: true })
  notIn?: Array<keyof typeof SupportedNetwork>;

  @Field(() => NestedEnumSupportedNetworkFilter, { nullable: true })
  not?: NestedEnumSupportedNetworkFilter;
}
