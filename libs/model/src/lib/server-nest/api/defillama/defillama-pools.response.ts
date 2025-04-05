export type DefillamaYieldsApiResponse = {
  status: string;
  data: DefillamaYieldType[];
};

export enum PredictedClassType {
  StableUp = "Stable/Up",
  StableDown = "Stable/Down",
  VolatileUp = "Volatile/Up",
  VolatileDown = "Volatile/Down",
}

/** Data type for DefiLlama '/yields' api response */
export interface DefillamaYieldType {
  chain: string;
  project: string;
  tvlUsd: number;
  apyBase: number;
  apyReward: number;
  apy: number;
  apyPct1D: number;
  apyPct7D: number;
  apyPct30D: number;
  ilRisk: string;
  predictions: {
    predictedClass: PredictedClassType;
    predictedProbability: number;
    binnedConfidence: number;
  };
  poolMeta?: string;
  apyBase7d: number;
  apyMean30d: number;
  volumeUsd1d: number;
  volumeUsd7d: number;
}
