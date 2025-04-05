import type { AgentResponse } from "@libs/graphql";
import { IconButton, NetworkIcon } from "@libs/ui";
import { formatDate } from "@libs/utils-client";

export interface AgentInfoCardProps {
  agentInfo: AgentResponse;
}

export const AgentInfoCard = ({ agentInfo }: AgentInfoCardProps) => {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
            <IconButton name="Agent" size={24} iconClassName="text-primary-600" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-18/heading text-gray-950">{agentInfo.name}</h2>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1">
                <NetworkIcon chainId={agentInfo.chain?.chainId || ""} size={12} />
                <span className="text-12/body text-gray-500">{agentInfo.chain?.name || "Unknown Network"}</span>
              </div>
              <span className="text-12/body text-gray-500">•</span>
              <span className="text-12/body text-gray-500">Created {formatDate(agentInfo.createdAt)}</span>
            </div>
          </div>
        </div>
        <p className="text-14/body text-gray-700">{agentInfo.description}</p>
        {/* Contract Address Information */}
        <div className="mt-2 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-12/body text-gray-600">Vault Address</span>
            <div className="flex items-center gap-1">
              <span className="text-14/body font-medium text-gray-950">
                {agentInfo.vaultAddress?.slice(0, 6)}...{agentInfo.vaultAddress?.slice(-4)}
              </span>
              <IconButton
                name="ExternalLink"
                size={16}
                iconClassName="!text-gray-600"
                onClick={() => {
                  window.open(
                    `https://${agentInfo.chain?.blockExplorerUrl}/address/${agentInfo.vaultAddress}`,
                    "_blank",
                  );
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-12/body text-gray-600">Agent Address</span>
            <div className="flex items-center gap-1">
              <span className="text-14/body font-medium text-gray-950">
                {agentInfo.address?.slice(0, 6)}...{agentInfo.address?.slice(-4)}
              </span>
              <IconButton
                name="ExternalLink"
                size={16}
                iconClassName="!text-gray-600"
                onClick={() => {
                  window.open(`https://${agentInfo.chain?.blockExplorerUrl}/address/${agentInfo.address}`, "_blank");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
