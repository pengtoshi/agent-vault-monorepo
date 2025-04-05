import { Controller, Post, Query } from "@nestjs/common";
import { AgentService } from "./agent.service";

// NOTE: Controller for testing
@Controller("agent")
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  async executeAgent(@Query("agentId") agentId: string) {
    return this.agentService.executeAgent(agentId);
  }

  @Post("all")
  async executeAllAgents() {
    return this.agentService.executeAllAgents();
  }
}
