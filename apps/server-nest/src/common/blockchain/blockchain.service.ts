import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ErrorMessage } from "@libs/constants";
import type { NetworkConfig } from "@libs/nestjs-core";

@Injectable()
export class BlockchainService {
  constructor(private readonly configService: ConfigService) {}

  getRpcUrl(chainId: number) {
    const networkConfig = this.configService.get<NetworkConfig>("network")!;
    const rpcUrl = networkConfig.rpcUrl[chainId];
    if (!rpcUrl) throw new Error(ErrorMessage.MSG_NOT_FOUND_RPC_URL);
    return rpcUrl;
  }
}
