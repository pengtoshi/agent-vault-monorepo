export type TokenPluginInput = {
  decimals: number;
  symbol: string;
  name: string;
  chains: { [key: string]: { contractAddress: `0x${string}` } };
};
