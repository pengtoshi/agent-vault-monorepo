export type DefiLlamaPoolsApiResponse = {
  status: string;
  data: PoolUpdateData[];
};

/** DefiLlama '/pools' api 반환 값에서 사용하는 데이터 */
export type PoolUpdateData = {
  chain: string;
  // project: string;
  // symbol: string;
  tvlUsd: number;
  apyBase: number;
  apyReward: number | null;
  apy: number;
  // rewardTokens: string[] | null;
  pool: string;
  // apyPct1D: number;
  // apyPct7D: number;
  // apyPct30D: number;
  // stablecoin: boolean;
  // ilRisk: string;
  // exposure: string;
  // predictions: {
  //   predictedClass: string;
  //   predictedProbability: number;
  //   binnedConfidence: number;
  // };
  // poolMeta: string | null;
  // mu: number;
  // sigma: number;
  // count: number;
  // outlier: boolean;
  // underlyingTokens: string[];
  // il7d: number | null;
  // apyBase7d: number | null;
  // apyMean30d: number;
  // volumeUsd1d: number | null;
  // volumeUsd7d: number | null;
  // apyBaseInception: number | null;
};
