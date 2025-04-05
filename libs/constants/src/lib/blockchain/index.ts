import type { Address } from "viem";
import { baseSepolia, celoAlfajores, flowTestnet, polygonAmoy, rootstockTestnet, zircuitTestnet } from "viem/chains";

export const GAS_LIMIT = 3000000;

export const VIEM_CHAINS = {
  84532: baseSepolia,
  48899: zircuitTestnet,
  80002: polygonAmoy,
  31: rootstockTestnet,
  44787: celoAlfajores,
  545: flowTestnet,
};

export const NetworkNameByChainId: Record<number, string> = {
  84532: "Base", // Testnet(Sepolia)
  48899: "Zircuit", // Testnet
  80002: "Polygon", // Testnet(Amoy)
  31: "Rootstock", // Testnet
  44787: "Celo", // Testnet(Alfajores)
  545: "Flow", // Testnet
};

export const VAULT_FACTORY_ADDRESSES: Record<number, Address> = {
  545: "0xe3927e57Fa5caA8Ae01c140099C2ceada3DF7163", // Flow
  31: "0xe3927e57Fa5caA8Ae01c140099C2ceada3DF7163", // Rootstock
  44787: "0xe3927e57Fa5caA8Ae01c140099C2ceada3DF7163", // Celo
};

export const NATIVE_CURRENCY_SYMBOLS: Record<number, string> = {
  545: "FLOW",
  31: "RBTC",
  44787: "CELO",
  80002: "POL",
  84532: "ETH",
  48899: "ETH",
};
