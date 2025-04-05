import { Controller, Post, Query } from "@nestjs/common";
import { AgentService } from "./agent.service";

@Controller("agent")
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  async executeAgent(@Query("agentId") agentId: string) {
    return this.agentService.executeAgent(agentId);
  }
}
