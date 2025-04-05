import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { ChainInfo, TokenInfo } from "@libs/model";
import { TokenService } from "./token.service";

@Resolver(() => TokenInfo)
export class TokenResolver {
  constructor(private readonly tokenService: TokenService) {}

  @Query(() => [TokenInfo])
  async findAllTokens() {
    return this.tokenService.findAllTokens();
  }

  @Query(() => TokenInfo)
  async findTokenByAddress(@Args("address") address: string) {
    return this.tokenService.findTokenByAddress(address);
  }

  @ResolveField("chain", () => ChainInfo, { nullable: false })
  async resolveChain(@Parent() token: TokenInfo) {
    return this.tokenService.resolveChain(token.chainId);
  }
}
