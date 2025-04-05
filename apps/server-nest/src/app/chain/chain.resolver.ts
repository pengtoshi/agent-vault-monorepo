import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AgentInfo, ChainInfo } from "@libs/model";
import { ChainService } from "./chain.service";

@Resolver(() => ChainInfo)
export class ChainResolver {
  constructor(private readonly chainService: ChainService) {}

  @Query(() => [ChainInfo])
  async findAllChains() {
    return this.chainService.findAllChains();
  }

  @Query(() => ChainInfo)
  async findChainById(@Args("chainId", { type: () => Int, nullable: false, description: "Chain ID" }) chainId: number) {
    return this.chainService.findChainById(chainId);
  }

  @ResolveField("agents", () => [AgentInfo], { nullable: true })
  async resolveAgents(@Parent() chain: ChainInfo) {
    return this.chainService.resolveAgents(chain.chainId);
  }
}
