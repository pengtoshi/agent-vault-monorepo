import { Module } from "@nestjs/common";
import { MarketService } from "./market.service";
import { DefillamaApiModule } from "../../common/defillama-api/defillama-api.module";

@Module({
  imports: [DefillamaApiModule],
  providers: [MarketService],
  exports: [MarketService],
})
export class MarketModule {}
