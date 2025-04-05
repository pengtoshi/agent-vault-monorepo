import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { AgentController } from "./agent.controller";
import { AgentProcessor } from "./agent.processor";
import { AgentResolver } from "./agent.resolver";
import { AgentService } from "./agent.service";
import { BlockchainModule } from "../../common/blockchain/blockchain.module";
import { DefillamaApiModule } from "../../common/defillama-api/defillama-api.module";
import { MarketModule } from "../market/market.module";
import { TokenModule } from "../token/token.module";

@Module({
  imports: [
    BullModule.registerQueue({ name: "agent" }),
    ScheduleModule.forRoot(),
    MarketModule,
    DefillamaApiModule,
    BlockchainModule,
    TokenModule,
  ],
  controllers: [AgentController],
  providers: [AgentService, AgentResolver, AgentProcessor],
  exports: [AgentService],
})
export class AgentModule {}
