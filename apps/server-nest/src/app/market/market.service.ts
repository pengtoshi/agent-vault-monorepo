import { Injectable } from "@nestjs/common";
import { DefillamaApiService } from "../../common/defillama-api/defillama-api.service";

@Injectable()
export class MarketService {
  constructor(private readonly defillamaApiService: DefillamaApiService) {}

  async getMarketData() {
    // TODO: Remove mock data
    // const marketData = await this.defillamaApiService.getAllPools();
    const marketData = {
      pools: [
        {
          name: "Mock Pool 1",
          apy: 5.2,
          tvl: 1000000,
        },
        {
          name: "Mock Pool 2",
          apy: 4.8,
          tvl: 800000,
        },
      ],
    };
    return marketData;
  }
}
