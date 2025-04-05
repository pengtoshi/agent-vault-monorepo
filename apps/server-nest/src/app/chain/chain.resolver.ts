import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AgentInfo, ChainInfo, StrategyInfo } from "@libs/model";
import { ChainService } from "./chain.service";

@Resolver(() => ChainInfo)
export class ChainResolver {
  constructor(private readonly chainService: ChainService) {}

  @Query(() => [ChainInfo])
  async findAllChains() {
    return this.chainService.findAllChains();
  }

  @Query(() => ChainInfo)
  async findChainById(
    @Args("chainId", { type: () => String, nullable: false, description: "Chain ID" }) chainId: string,
  ) {
    return this.chainService.findChainById(chainId);
  }

  @ResolveField("agents", () => [AgentInfo], { nullable: true })
  async resolveAgents(@Parent() chain: ChainInfo) {
    return this.chainService.resolveAgents(chain.chainId);
  }

  @ResolveField("strategies", () => [StrategyInfo], { nullable: true })
  async resolveStrategies(@Parent() chain: ChainInfo) {
    return this.chainService.resolveStrategies(chain.chainId);
  }
}
