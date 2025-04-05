import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AgentInfo, CreateAgentInput, Message, PublicAgentInfo } from "@libs/model";
import { AgentService } from "./agent.service";

@Resolver(() => AgentInfo)
export class AgentResolver {
  constructor(private readonly agentService: AgentService) {}

  @Mutation(() => AgentInfo)
  async createAgent(@Args("input") agentInput: CreateAgentInput) {
    return this.agentService.createAgent(agentInput);
  }

  @Query(() => PublicAgentInfo)
  async getAgent(@Args("id") id: string) {
    return this.agentService.getAgent(id);
  }

  @Query(() => [PublicAgentInfo])
  async findAllAgents() {
    return this.agentService.findAllAgents();
  }

  @ResolveField("messages", () => [Message], { nullable: true })
  async resolveMessages(@Parent() agentInfo: AgentInfo) {
    return this.agentService.resolveMessages(agentInfo.id);
  }
}
