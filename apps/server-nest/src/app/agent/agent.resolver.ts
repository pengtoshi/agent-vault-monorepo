import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AgentInfo, CreateAgentInput } from "@libs/model";
import { AgentService } from "./agent.service";

@Resolver(() => AgentInfo)
export class AgentResolver {
  constructor(private readonly agentService: AgentService) {}

  @Mutation(() => AgentInfo)
  async createAgent(@Args("input") agentInput: CreateAgentInput) {
    return this.agentService.createAgent(agentInput);
  }

  @Query(() => AgentInfo)
  async getAgent(@Args("id") id: string) {
    return this.agentService.getAgent(id);
  }

  @Query(() => [AgentInfo])
  async findAllAgents() {
    return this.agentService.findAllAgents();
  }
}
