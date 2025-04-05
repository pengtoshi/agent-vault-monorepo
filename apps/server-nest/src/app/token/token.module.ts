import { Module } from "@nestjs/common";
import { TokenResolver } from "./token.resolver";
import { TokenService } from "./token.service";
import { BlockchainModule } from "../../common/blockchain/blockchain.module";

@Module({
  imports: [BlockchainModule],
  providers: [TokenResolver, TokenService],
  exports: [TokenService],
})
export class TokenModule {}
