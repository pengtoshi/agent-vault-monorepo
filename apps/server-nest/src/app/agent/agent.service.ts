import { openai } from "@ai-sdk/openai";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { USDC, erc20 } from "@goat-sdk/plugin-erc20";
import { ionic } from "@goat-sdk/plugin-ionic";
import { kim } from "@goat-sdk/plugin-kim";
import { sendETH } from "@goat-sdk/wallet-evm";
import { viem } from "@goat-sdk/wallet-viem";
import { Injectable } from "@nestjs/common";
import { generateText } from "ai";
import { createWalletClient, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { mode } from "viem/chains";
import { ErrorMessage } from "@libs/constants";
import type { CreateAgentInput } from "@libs/model";
import { PrismaService } from "@libs/nestjs-core";
import { getTokenPluginInput } from "@libs/utils-server";
import { BlockchainService } from "../../common/blockchain/blockchain.service";
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
      chain: mode,
    });
    const tokens = await this.tokenService.findTokensByChainId(agent.chainId);
    const tokenPluginInputs = tokens.map((token) => getTokenPluginInput(token));

    const onChainTools = await getOnChainTools({
      wallet: viem(walletClient),
      plugins: [sendETH(), erc20({ tokens: tokenPluginInputs }), kim(), ionic()],
    });

    return onChainTools;
  }

  async executeAgent(agentId: string) {
    try {
      // Get market data from Defillama
      const marketData = await this.marketService.getMarketData();

      // Create prompt with market data
      const prompt = this.createPrompt(marketData);
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

  private createPrompt(marketData: any): string {
    // TODO: Implement proper prompt creation with market data
    return `You are an AI Agent managing a DeFi vault. Current market conditions:
    ${JSON.stringify(marketData, null, 2)}
    
    Based on this information, analyze the market and make investment decisions to maximize yield for the vault.`;
  }
}
