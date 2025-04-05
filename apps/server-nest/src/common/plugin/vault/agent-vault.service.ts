import { Tool } from "@goat-sdk/core";
import { EVMWalletClient } from "@goat-sdk/wallet-evm";
import type { Abi } from "viem";
import { AgentVault__factory } from "@apps/typechains";
import { GetAllStrategyAddressesParams, SetNewStrategyParams } from "./parameter";

const TEST_DEFI_STRATEGY_ADDRESS = "0x10176614063F7535CAEe18FC1D0f83175D54fC0f";
const ALT_TEST_DEFI_STRATEGY_ADDRESS = "0xa7f9AB7C27C70180bC6123B34D0a9Fa6E5f49f56";

const STRATEGY_ADDRESSES = [
  {
    strategyName: "Test Defi",
    strategyAddress: TEST_DEFI_STRATEGY_ADDRESS,
  },
  {
    strategyName: "Alt Test Defi",
    strategyAddress: ALT_TEST_DEFI_STRATEGY_ADDRESS,
  },
];

export class AgentVaultService {
  @Tool({
    name: "agent_vault_get_strategy_addresses",
    description: "Get the list of strategy addresses by strategy name.",
  })
  getAllStrategyAddresses(params: GetAllStrategyAddressesParams) {
    return STRATEGY_ADDRESSES;
  }

  @Tool({
    name: "agent_vault_set_new_strategy",
    description:
      "Set a new strategy to the vault. Returns a transaction hash on success. Once you get a transaction hash, the set is complete - do not call this function again.",
  })
  async setNewStrategy(walletClient: EVMWalletClient, parameters: SetNewStrategyParams) {
    try {
      console.log(parameters.strategyAddress);
      const hash = await walletClient.sendTransaction({
        to: parameters.vaultAddress,
        abi: AgentVault__factory.abi as Abi,
        functionName: "setStrategy",
        args: [parameters.strategyAddress],
      });

      return hash.hash;
    } catch (error) {
      throw new Error(`Failed to set new strategy: ${error}`);
    }
  }
}
