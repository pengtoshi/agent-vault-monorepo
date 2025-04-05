import { openai } from "@ai-sdk/openai";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { viem } from "@goat-sdk/wallet-viem";
import { Injectable } from "@nestjs/common";
import { generateText } from "ai";
import { createWalletClient, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { ErrorMessage } from "@libs/constants";
import type { CreateAgentInput } from "@libs/model";
import { PrismaService } from "@libs/nestjs-core";
import { getTokenPluginInput } from "@libs/utils-server";
import { BlockchainService } from "../../common/blockchain/blockchain.service";
import { agentVaultPlugin } from "../../common/plugin/vault/agent-vault.plugin";
import { MarketService } from "../market/market.service";
import { TokenService } from "../token/token.service";

@Injectable()
export class AgentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly marketService: MarketService,
    private readonly tokenService: TokenService,
    private readonly blockchainService: BlockchainService,
  ) {}

  async createAgent(createAgentInput: CreateAgentInput) {
    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount(privateKey);

    const agent = await this.prisma.agent.create({
      data: {
        ...createAgentInput,
        address: account.address,
        privateKey,
      },
    });

    return agent;
  }

  async getAgentOnChainTools(agentId: string) {
    const agent = await this.prisma.extended.agent.findUnique({
      where: { id: agentId },
    });
    if (!agent) throw new Error(ErrorMessage.MSG_NOT_FOUND_AGENT);

    const rpcUrl = this.blockchainService.getRpcUrl(agent.chainId);
    const walletClient = createWalletClient({
      account: privateKeyToAccount(agent.privateKey as `0x${string}`),
      transport: http(rpcUrl),
      chain: baseSepolia,
    });
    // const tokens = await this.tokenService.findTokensByChainId(agent.chainId);
    // const tokenPluginInputs = tokens.map((token) => getTokenPluginInput(token));

    const onChainTools = await getOnChainTools({
      wallet: viem(walletClient),
      plugins: [agentVaultPlugin()],
    });

    return onChainTools;
  }

  async executeAgent(agentId: string) {
    try {
      // const marketData = await this.marketService.getMarketData();
      const mockMarketData = [
        {
          strategyName: "Test Defi",
          token: "TestToken",
          apy: 5.9,
          tvl: 1000000,
        },
        {
          strategyName: "Alt Test Defi",
          token: "TestToken",
          apy: 10.8,
          tvl: 800000,
        },
      ];
      const mockDefaultPrompt = "Manage the vault to maximize yield. Prefer the highest apy strategy.";
      const mockVaultAddress = "0x1c55A489B09783E7D71a864444D13816705DE2AC";
      const prompt = this.getPrompt(mockMarketData, mockDefaultPrompt, "Test Defi", mockVaultAddress);
      console.log(prompt);

      const tools = await this.getAgentOnChainTools(agentId);
      const result = await generateText({
        model: openai("gpt-4o-mini"),
        tools,
        maxSteps: 10,
        prompt,
        onStepFinish: (event) => {
          console.log("Tool execution result:", event.toolResults);
        },
      });

      console.log("AI Agent response:", result.text);
      return result.text;
    } catch (error) {
      console.error("Error executing AI Agent:", error);
      throw error;
    }
  }

  private getPrompt(marketData: any, defaultPrompt: string, currentStrategyName: string, vaultAddress: string): string {
    return ` 
    Current market conditions(in JSON format):
    ${JSON.stringify(marketData)}

    Vault creator request: 
    ${defaultPrompt}

    Name of the current strategy:
    ${currentStrategyName}

    =====================================================
    
    You are an AI Agent managing a Agent-managed DeFi vault.
    Your vault address is "${vaultAddress}".
    Based on this information above, analyze the market and determine to set a new strategy or keep the current strategy.
    You can get the list of strategy by calling the tool "agent_vault_get_strategy_and_addresses".
    To set a new strategy, you need to call the tool "agent_vault_set_new_strategy".
    If you decide to keep the current strategy, return a reason why.
    `;
  }

  async getAgent(agentId: string) {
    return this.prisma.agent.findUnique({ where: { id: agentId } });
  }

  async findAllAgents() {
    return this.prisma.agent.findMany();
  }
}
