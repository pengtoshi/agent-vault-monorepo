import { Injectable } from "@nestjs/common";
import { DefillamaApiService } from "../../common/defillama-api/defillama-api.service";

@Injectable()
export class MarketService {
  constructor(private readonly defillamaApiService: DefillamaApiService) {}

  async getMarketData() {
    // TODO: Remove mock data
    // const marketData = await this.defillamaApiService.getAllPools();
    const mockMarketData = [
      {
        strategyName: "Test Defi",
        token: "TestToken",
        apy: 5.9,
        tvl: 1000000,
      },
      {
        strategyName: "Alt Test Defi",
        token: "TestToken",
        apy: 10.8,
        tvl: 800000,
      },
    ];
    return mockMarketData;
  }
}
