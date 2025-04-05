import { Injectable } from "@nestjs/common";
import { ErrorMessage } from "@libs/constants";
import { PrismaService } from "@libs/nestjs-core";

@Injectable()
export class ChainService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllChains() {
    return this.prisma.extended.chain.findMany();
  }

  async findChainById(chainId: string) {
    if (!chainId) throw new Error(ErrorMessage.MSG_NOT_FOUND_CHAIN);
    return this.prisma.extended.chain.findUnique({ where: { chainId } });
  }

  async resolveAgents(chainId: string) {
    if (!chainId) throw new Error(ErrorMessage.MSG_NOT_FOUND_CHAIN);
    return this.prisma.extended.agent.findMany({ where: { chainId } });
  }

  async resolveStrategies(chainId: string) {
    if (!chainId) throw new Error(ErrorMessage.MSG_NOT_FOUND_CHAIN);
    return this.prisma.extended.strategy.findMany({ where: { chainId } });
  }
}
