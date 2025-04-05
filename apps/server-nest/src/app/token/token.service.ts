import { Injectable } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { ErrorMessage } from "@libs/constants";
import { PrismaService } from "@libs/nestjs-core";
import { ERC20__factory } from "@apps/typechains";
import type { Prisma } from "~/prisma/generated/client";
import { BlockchainService } from "../../common/blockchain/blockchain.service";

@Injectable()
export class TokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly blockchainService: BlockchainService,
  ) {}

  async createTokenTx(tokenAddress: string, chainId: string, prismaTransaction: Prisma.TransactionClient) {
    const tokenContractInfo = await this.findTokenContractInfo(chainId, tokenAddress);
    return prismaTransaction.token.create({
      data: {
        ...tokenContractInfo,
        chainId,
        address: tokenAddress,
      },
    });
  }

  async findTokenContractInfo(chainId: string, tokenAddress: string) {
    const provider = this.blockchainService.getProvider(chainId);
    const tokenContract = ERC20__factory.connect(tokenAddress, provider);
    const [name, symbol, decimals] = await Promise.all([
      tokenContract.name(),
      tokenContract.symbol(),
      tokenContract.decimals(),
    ]);
    return { name, symbol, decimals };
  }

  async findAllTokens() {
    return this.prisma.extended.token.findMany();
  }

  async findTokenByAddress(address: string) {
    return this.prisma.extended.token.findUnique({
      where: {
        address,
      },
    });
  }

  async findTokensByChainId(chainId: string) {
    return this.prisma.extended.token.findMany({
      where: {
        chainId,
      },
    });
  }

  async resolveChain(chainId: string) {
    if (!chainId) throw new GraphQLError(ErrorMessage.MSG_NOT_FOUND_CHAIN);
    return this.prisma.extended.chain.findUnique({
      where: {
        chainId,
      },
    });
  }
}
