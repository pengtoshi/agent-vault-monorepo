import { type Chain, PluginBase } from "@goat-sdk/core";
import type { EVMWalletClient } from "@goat-sdk/wallet-evm";
import { VIEM_CHAINS } from "@libs/constants";
import { AgentVaultService } from "./agent-vault.service";

const SUPPORTED_CHAINS = Object.values(VIEM_CHAINS);

export class AgentVaultPlugin extends PluginBase<EVMWalletClient> {
  constructor() {
    super("agent-vault", [new AgentVaultService()]);
  }

  supportsChain = (chain: Chain) => chain.type === "evm" && SUPPORTED_CHAINS.some((c) => c.id === chain.id);
}

export const agentVaultPlugin = () => new AgentVaultPlugin();
