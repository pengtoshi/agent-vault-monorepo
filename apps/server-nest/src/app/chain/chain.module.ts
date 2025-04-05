import { Module } from "@nestjs/common";
import { ChainResolver } from "./chain.resolver";
import { ChainService } from "./chain.service";

@Module({
  providers: [ChainService, ChainResolver],
  exports: [ChainService],
})
export class ChainModule {}
