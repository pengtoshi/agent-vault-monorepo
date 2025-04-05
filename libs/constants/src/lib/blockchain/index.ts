import {
  baseSepolia,
  celoAlfajores,
  flowTestnet,
  optimismSepolia,
  polygonAmoy,
  rootstockTestnet,
  zircuitTestnet,
} from "viem/chains";

export const GAS_LIMIT = 3000000;

export const VIEM_CHAINS = {
  84532: baseSepolia,
  11155420: optimismSepolia,
  48899: zircuitTestnet,
  80002: polygonAmoy,
  31: rootstockTestnet,
  44787: celoAlfajores,
  545: flowTestnet,
};

export const NetworkNameByChainId: Record<number, string> = {
  84532: "Base", // Testnet(Sepolia)
  11155420: "Optimism", // Testnet(Sepolia)
  48899: "Zircuit", // Testnet
  80002: "Polygon", // Testnet(Amoy)
  31: "Rootstock", // Testnet
  44787: "Celo", // Testnet(Alfajores)
  545: "Flow", // Testnet
};
