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
