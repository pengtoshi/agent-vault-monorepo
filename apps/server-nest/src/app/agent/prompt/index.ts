import { TOOL_NAME } from "../../../common/plugin/vault/agent-vault.service";

export const getExecutionPrompt = (marketData: any, defaultPrompt: string, vaultAddress: string): string => {
  return `
Role:
You are an AI agent responsible for managing an AI-managed vault.
The vault address is "${vaultAddress}".

Information:
- Market Conditions:
${JSON.stringify(marketData)}
- Vault Manager's Requirements:
${defaultPrompt}

Objective:
Based on the provided market conditions and the vault manager’s requirements, determine the best investment decision.

Choose one of the following options:
1. Switch to a New Strategy
   - Requirement: Execute the tool "${TOOL_NAME.CHANGE_STRATEGY}" to change the strategy.
   - Output: After choosing this option, return a structured summary of the evidence and reasoning supporting the switch.
2. Maintain the Current Strategy
   - Requirement: Do not call the tool "${TOOL_NAME.CHANGE_STRATEGY}"!!.
   - Output: After choosing this option, return a structured summary of the evidence and reasoning supporting the decision to maintain the current strategy.

Return your decision and the reason. Use bullet points or numbered lists if needed to enhance clarity. Do not ask again.
  `;
};
