import clsx from "clsx";
import { UsersRound } from "lucide-react";
import { useRouter } from "next/router";
import { NetworkIcon } from "@libs/ui";
import type { UIProps } from "@libs/ui";
import { formatNumber } from "@libs/utils-client";
import { AgentVaultLogo } from "~/client-next/src/components/AgentVaultLogo/AgentVaultLogo";
import { TokenLogo } from "~/client-next/src/components/TokenLogo/TokenLogo";

export interface AgentElementProps extends UIProps.Button {
  agentId: string;
  chainId: string;
  tokenImageUrl?: string;
  name: string;
  description: string;
  depositNum: number;
  depositAmount: number;
  apy: number;
  lastElement?: boolean;
}

export const AgentElement = ({
  agentId,
  chainId,
  tokenImageUrl,
  name,
  description,
  depositNum,
  depositAmount,
  apy,
  lastElement = false,
  className,
  ...props
}: AgentElementProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/agents/${agentId}`)}
      className={clsx(
        "group flex w-full items-center justify-between gap-3 border-b border-gray-200 py-4",
        lastElement && "border-b-0",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="transition-transform duration-1000 ease-out group-hover:-translate-y-1">
          <AgentVaultLogo chainId={chainId} tokenImageUrl={tokenImageUrl} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start justify-between gap-1.5">
          <div className="flex w-full flex-col items-start gap-0.5">
            <span className="text-16/body/emp text-gray-950">{name}</span>
            <span className="w-full truncate text-left text-12/body text-gray-600">{description}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <UsersRound className="h-4 w-4 text-gray-600" />
              <span className="text-14/body text-gray-600">{depositNum}</span>
            </div>
            <div className="flex items-center gap-1">
              <TokenLogo tokenImageUrl={tokenImageUrl} size={16} />
              <span className="text-14/body text-gray-600">{formatNumber(depositAmount)}</span>
            </div>
          </div>
        </div>
      </div>
      <span className="mr-2 text-18/heading text-gray-950">{apy}%</span>
    </button>
  );
};

export const NetworkFilterElement = ({
  name,
  chainId,
  number,
  onClick,
  selected = false,
}: {
  name: string;
  chainId: string;
  number: number;
  onClick: () => void;
  selected?: boolean;
}) => {
  return (
    <button
      type="button"
      disabled={number === 0}
      className={clsx(
        "flex items-center gap-1.5 rounded-full border border-gray-200 py-1 pl-2 pr-3 transition-colors duration-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50",
        selected && "border-primary-500",
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-1">
        <NetworkIcon chainId={chainId} size={16} />
        <span className={clsx("text-14/body text-gray-600", selected && "text-gray-950")}>{name}</span>
      </div>
      <span className={clsx("text-14/body text-gray-600", selected && "text-gray-950")}>{number}</span>
    </button>
  );
};
