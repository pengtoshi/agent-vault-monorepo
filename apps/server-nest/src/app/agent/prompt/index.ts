import type { DefillamaYieldsApiResponse } from "@libs/model";
import { TOOL_NAME } from "../../../common/plugin/vault/agent-vault.service";

export const getExecutionPrompt = (
  marketData: DefillamaYieldsApiResponse,
  defaultPrompt: string,
  vaultAddress: string,
  chainId: string,
  riskLevel: number,
): string => {
  return `
Role:
You are an AI agent responsible for managing an AI-managed vault.
The vault address is "${vaultAddress}".
The chain ID of the vault is "${chainId}".

Information:
- Market Conditions:
${JSON.stringify(marketData.data, null, 2)}

Market Data Explanation:
1. TVL (Total Value Locked): Total USD value of assets locked in the strategy
2. APY (Annual Percentage Yield): Annual return rate
   - apyBase: Base return rate
   - apyReward: Additional reward rate
   - apy: Total return rate (apyBase + apyReward)
3. APY Change Trends
   - apyPct1D: 1-day APY change rate
   - apyPct7D: 7-day APY change rate
   - apyPct30D: 30-day APY change rate
4. IL Risk: Impermanent Loss risk indicator ('yes' or 'no')
5. Prediction Data
   - predictedClass: Predicted market direction (Stable/Up, Stable/Down, Volatile/Up, Volatile/Down)
   - predictedProbability: Prediction confidence (50-90%)
   - binnedConfidence: Prediction reliability (1-3)
6. Historical Data
   - apyBase7d: 7-day average base return rate
   - apyMean30d: 30-day average return rate
   - volumeUsd1d: 1-day trading volume
   - volumeUsd7d: 7-day trading volume

- Vault Manager's Requirements:
${defaultPrompt}

- Risk Level: ${riskLevel} (1-5)
  - 1: Very Conservative (Safety First)
  - 2: Conservative (Safety Focused)
  - 3: Neutral (Balanced Approach)
  - 4: Aggressive (Return Focused)
  - 5: Very Aggressive (High Return Seeking)

Objective:
Based on the provided market conditions, vault manager's requirements, and risk level, determine the best investment decision.

Choose one of the following options:
1. Switch to a New Strategy
   - Requirement: Execute the tool "${TOOL_NAME.CHANGE_STRATEGY}" to change the strategy.
   - Output: After choosing this option, return a structured summary of the evidence and reasoning supporting the switch.
2. Maintain the Current Strategy
   - Requirement: Do not call the tool "${TOOL_NAME.CHANGE_STRATEGY}"!!.
   - Output: After choosing this option, return a structured summary of the evidence and reasoning supporting the decision to maintain the current strategy.

Decision Making Guidelines:
- Higher Risk Level (4-5):
  * Prefer strategies with higher APY
  * Favor strategies with Volatile/Up predictions
  * Consider strategies with IL Risk
- Lower Risk Level (1-2):
  * Prefer strategies with stable APY
  * Favor strategies with Stable/Up predictions
  * Prioritize strategies without IL Risk

Return your decision and the reason. Use bullet points or numbered lists if needed to enhance clarity. Do not ask again.
  `;
};
