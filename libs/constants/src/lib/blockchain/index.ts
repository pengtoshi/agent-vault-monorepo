import type { Address } from "viem";
import { baseSepolia, celoAlfajores, flowTestnet, polygonAmoy, rootstockTestnet, zircuitTestnet } from "viem/chains";

export const GAS_LIMIT = 3000000;

export enum ChainId {
  Base = 84532,
  Zircuit = 48899,
  Polygon = 80002,
  Rootstock = 31,
  Celo = 44787,
  Flow = 545,
}

export const VIEM_CHAINS = {
  [ChainId.Base]: baseSepolia,
  [ChainId.Zircuit]: zircuitTestnet,
  [ChainId.Polygon]: polygonAmoy,
  [ChainId.Rootstock]: rootstockTestnet,
  [ChainId.Celo]: celoAlfajores,
  [ChainId.Flow]: flowTestnet,
};

export const NetworkNameByChainId: Record<number, string> = {
  [ChainId.Base]: "Base", // Testnet(Sepolia)
  [ChainId.Zircuit]: "Zircuit", // Testnet
  [ChainId.Polygon]: "Polygon", // Testnet(Amoy)
  [ChainId.Rootstock]: "Rootstock", // Testnet
  [ChainId.Celo]: "Celo", // Testnet(Alfajores)
  [ChainId.Flow]: "Flow", // Testnet
};

export const VAULT_FACTORY_ADDRESSES: Record<number, Address> = {
  [ChainId.Flow]: "0x330EBFf1F8c8797Fb930a670A67CE864b7887059", // Flow
  [ChainId.Rootstock]: "0x6e57e8Dd5764F2C2C176B878808BC73b2a8AcE42", // Rootstock
  [ChainId.Celo]: "0x519B51aC32ec0857de0AffECa3F22B3C9F8E0cDD", // Celo
  [ChainId.Zircuit]: "0xe3927e57Fa5caA8Ae01c140099C2ceada3DF7163", // Zircuit
  [ChainId.Polygon]: "0xB93b8C373c2Db8234B6c162E016dbc69C3F981D5", // Polygon
  [ChainId.Base]: "0x60D5ad54f2E4fDA1711e5275bA14Df1867ACf58D", // Base
};

export const NATIVE_CURRENCY_SYMBOLS: Record<number, string> = {
  [ChainId.Flow]: "FLOW",
  [ChainId.Rootstock]: "RBTC",
  [ChainId.Celo]: "CELO",
  [ChainId.Polygon]: "POL",
  [ChainId.Base]: "ETH",
  [ChainId.Zircuit]: "ETH",
};
