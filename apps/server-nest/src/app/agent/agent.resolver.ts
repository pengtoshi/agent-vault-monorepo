import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AgentInfo, ChainInfo, CreateAgentInput, DepositAgentInput, MessageInfo } from "@libs/model";
import { AgentService } from "./agent.service";

@Resolver(() => AgentInfo)
export class AgentResolver {
  constructor(private readonly agentService: AgentService) {}

  @Mutation(() => AgentInfo)
  async createAgent(@Args("input") agentInput: CreateAgentInput) {
    return this.agentService.createAgent(agentInput);
  }

  @Mutation(() => AgentInfo)
  async depositAgent(@Args("input") depositAgentInput: DepositAgentInput) {
    return this.agentService.depositAgent(depositAgentInput);
  }

  @Query(() => AgentInfo)
  async findAgentById(@Args("id", { type: () => String, nullable: false, description: "Agent ID" }) id: string) {
    return this.agentService.findAgentById(id);
  }

  @Query(() => [AgentInfo])
  async findAllAgents() {
    return this.agentService.findAllAgents();
  }

  @ResolveField("messages", () => [MessageInfo], { nullable: true })
  async resolveMessages(@Parent() agentInfo: AgentInfo) {
    return this.agentService.resolveMessages(agentInfo.id);
  }

  @ResolveField("chain", () => ChainInfo, { nullable: true })
  async resolveChain(@Parent() agentInfo: AgentInfo) {
    return this.agentService.resolveChain(agentInfo.chainId);
  }
}
