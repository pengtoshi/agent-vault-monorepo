import { Tool } from "@goat-sdk/core";
import { EVMWalletClient } from "@goat-sdk/wallet-evm";
import type { Abi } from "viem";
import { ErrorMessage, STRATEGY_INFOS } from "@libs/constants";
import { AgentVault__factory } from "@apps/typechains";
import { GetStrategyListParams, GetStrategyParams, SetNewStrategyParams } from "./parameter";

export const TOOL_NAME = {
  GET_STRATEGIES_INFO: "agent_vault_get_strategies_info",
  GET_CURRENT_STRATEGY: "agent_vault_get_current_strategy",
  CHANGE_STRATEGY: "agent_vault_change_strategy",
};

export class AgentVaultService {
  @Tool({
    name: TOOL_NAME.GET_STRATEGIES_INFO,
    description: "Get the list of strategy infomation. It includes name of the strategy and its address.",
  })
  getAllStrategiesInfo(parameters: GetStrategyListParams) {
    return STRATEGY_INFOS[Number(parameters.chainId)];
  }

  @Tool({
    name: TOOL_NAME.GET_CURRENT_STRATEGY,
    description: "Get the current strategy name of the vault.",
  })
  async getCurrentStrategy(walletClient: EVMWalletClient, parameters: GetStrategyParams) {
    const currentStrategyAddress = (
      await walletClient.read({
        address: parameters.vaultAddress,
        functionName: "strategy",
        abi: AgentVault__factory.abi as Abi,
      })
    ).value as string;
    const strategyName = STRATEGY_INFOS[Number(parameters.chainId)].find(
      (strategy) => strategy.strategyAddress === currentStrategyAddress,
    )?.strategyName;
    if (!strategyName) {
      throw new Error(ErrorMessage.MSG_STRATEGY_NOT_FOUND);
    }
    return strategyName;
  }

  @Tool({
    name: TOOL_NAME.CHANGE_STRATEGY,
    description:
      "Change the strategy of the vault. Do not call this function if you decide to keep the current strategy. Returns a transaction hash on success. Once you get a transaction hash, the change is complete - do not call this function again.",
  })
  async setNewStrategy(walletClient: EVMWalletClient, parameters: SetNewStrategyParams) {
    try {
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
