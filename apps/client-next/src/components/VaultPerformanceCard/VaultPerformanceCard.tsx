import { formatNumber } from "@libs/utils-client";

export interface VaultMetrics {
  depositNum: number;
  depositAmount: number;
  apy: number;
  tokenSymbol: string;
}

export interface VaultPerformanceCardProps {
  metrics: VaultMetrics;
}

export const VaultPerformanceCard = ({ metrics }: VaultPerformanceCardProps) => {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4">
        <h3 className="text-16/body/emp text-gray-950">Vault Performance</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-1 rounded-lg bg-gray-100 p-3">
            <span className="text-12/body text-gray-500">Depositors</span>
            <span className="text-18/heading text-gray-950">{metrics.depositNum}</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-lg bg-gray-100 p-3">
            <span className="text-12/body text-gray-500">Total Deposit</span>
            <span className="text-18/heading text-gray-950">
              {formatNumber(metrics.depositAmount)} {metrics.tokenSymbol}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-lg bg-primary-100 p-3">
            <span className="text-12/body text-primary-400">Yield (APY)</span>
            <span className="text-18/heading text-primary-500">{metrics.apy}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
