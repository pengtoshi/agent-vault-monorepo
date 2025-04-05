import { Injectable } from "@nestjs/common";
import { PrismaService } from "@libs/nestjs-core";
import { DefillamaApiService } from "../../common/defillama-api/defillama-api.service";

@Injectable()
export class MarketService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly defillamaApiService: DefillamaApiService,
  ) {}

  async getMockMarketData(chainId: string) {
    const strategies = await this.prisma.extended.strategy.findMany({ where: { chainId } });
    const projectNames = strategies.map((strategy) => strategy.name);
    return this.defillamaApiService.getAllMockPools(chainId, projectNames);
  }
}
