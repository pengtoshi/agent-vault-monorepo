import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { AgentService } from "./agent.service";
import { BlockchainModule } from "../../common/blockchain/blockchain.module";
import { DefillamaApiModule } from "../../common/defillama-api/defillama-api.module";
import { MarketModule } from "../market/market.module";
import { TokenModule } from "../token/token.module";

@Module({
  imports: [ScheduleModule.forRoot(), MarketModule, DefillamaApiModule, BlockchainModule, TokenModule],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}
