import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { ErrorMessage } from "@libs/constants";
import { AgentService } from "./agent.service";

@Processor("agent")
export class AgentProcessor extends WorkerHost {
  private readonly logger = new Logger(AgentProcessor.name);

  constructor(private readonly agentService: AgentService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name} 🥳`);

    if (job.name === "executeAgent") {
      const { agentId } = job.data;
      try {
        await this.agentService.executeAgent(agentId);
      } catch (error) {
        this.logger.error(error.message);
        throw new Error(ErrorMessage.MSG_AGENT_EXECUTION_FAILED);
      }
    }
  }

  @OnWorkerEvent("completed")
  async onCompleted(job: Job<any, any, string>) {
    // do some stuff
    this.logger.log(`AgentProcessor completed 🍀: ${job.id}`);
    await job.remove();
  }

  @OnWorkerEvent("failed")
  onFailed(job: Job<any, any, string>, error: any) {
    // do some stuff
    this.logger.log("AgentProcessor failed 🚨: ", error);
  }
}
