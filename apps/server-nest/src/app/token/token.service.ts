import { Injectable } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { ErrorMessage } from "@libs/constants";
import { PrismaService } from "@libs/nestjs-core";

@Injectable()
export class TokenService {
  constructor(private readonly prisma: PrismaService) {}

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

  async findTokensByChainId(chainId: number) {
    return this.prisma.extended.token.findMany({
      where: {
        chainId,
      },
    });
  }

  async resolveChain(chainId: number) {
    if (!chainId) throw new GraphQLError(ErrorMessage.MSG_NOT_FOUND_CHAIN);
    return this.prisma.extended.chain.findUnique({
      where: {
        chainId,
      },
    });
  }
}
