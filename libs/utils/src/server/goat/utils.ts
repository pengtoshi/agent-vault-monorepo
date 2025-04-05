import type { TokenPluginInput } from "@libs/model";
import type { Token } from "~/prisma/generated/client";

export const getTokenPluginInput = (token: Token): TokenPluginInput => {
  return {
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name,
    chains: {
      [token.chainId]: { contractAddress: token.address as `0x${string}` },
    },
  };
};
