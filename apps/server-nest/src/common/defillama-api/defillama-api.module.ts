import { Module } from "@nestjs/common";
import { DefillamaApiService } from "./defillama-api.service";

@Module({
  providers: [DefillamaApiService],
  exports: [DefillamaApiService],
})
export class DefillamaApiModule {}
