import { useMemo, useState } from "react";
import type { Address } from "viem";
import { useAccount, useSwitchChain } from "wagmi";
import type { AgentResponse } from "@libs/graphql";
import { Button } from "@libs/ui";
import { type TabItem, TabNavigation } from "~/client-next/src/components/TabNavigation/TabNavigation";
import {
  type VaultMetrics,
  VaultPerformanceCard,
} from "~/client-next/src/components/VaultPerformanceCard/VaultPerformanceCard";
import { AgentInfoCard } from "./AgentInfoCard/AgentInfoCard";
import { DepositModal } from "./DepositModal/DepositModal";
import { MessagesTab } from "./MessagesTab/MessagesTab";
import { OverviewTab } from "./OverviewTab/OverviewTab";

type TabType = "overview" | "messages";

export const AgentDetails = ({ agentInfo }: { agentInfo: AgentResponse }) => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const { chainId } = useAccount();
  const { switchChain } = useSwitchChain();

  const vaultMetrics: VaultMetrics = useMemo(
    () => ({
      depositNum: 127,
      depositAmount: 25430,
      apy: 12.5,
      tokenSymbol: "ETH",
    }),
    [],
  );

  const sortedMessages = useMemo(() => {
    return [...(agentInfo.messages || [])].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [agentInfo.messages]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleDepositClick = () => {
    if (!chainId || !agentInfo.chainId) return;

    if (chainId !== Number(agentInfo.chainId)) {
      switchChain({ chainId: Number(agentInfo.chainId) });
      return;
    }
    setIsDepositModalOpen(true);
  };

  // Tab configuration
  const tabs: TabItem<TabType>[] = [
    { id: "overview", label: "Overview" },
    { id: "messages", label: "Agent Activity" },
  ];

  return (
    <div className="relative h-full w-full">
      <div className="flex w-full flex-col items-start gap-6 overflow-y-auto pb-24">
        {/* Agent Information Card */}
        <AgentInfoCard agentInfo={agentInfo} />
        {/* Vault Performance Card */}
        <VaultPerformanceCard metrics={vaultMetrics} />
        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
        {/* Tab Content */}
        {activeTab === "overview" ? <OverviewTab agentInfo={agentInfo} /> : <MessagesTab messages={sortedMessages} />}
      </div>
      {/* Deposit Button */}
      <div className="fixed bottom-6 z-20 flex w-full max-w-[600px] items-center justify-center pr-8">
        <Button className="w-full shadow-emphasize" onClick={handleDepositClick}>
          Deposit
        </Button>
      </div>
      <DepositModal
        agentId={agentInfo.id}
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        tokenAddress={agentInfo.tokenAddress as Address}
        vaultAddress={agentInfo.vaultAddress as Address}
      />
    </div>
  );
};
