import { useEffect, useMemo, useState } from "react";
import type { AgentsResponse, ChainsResponse } from "@libs/graphql";
import { Icon } from "@libs/ui";
import { AgentElement, NetworkFilterElement } from "./AgentsList.element";

// Crown colors for top 3 positions
const getCrownColor = (position: number): string => {
  switch (position) {
    case 0:
      return "text-yellow-400"; // Gold
    case 1:
      return "text-gray-500"; // Silver
    case 2:
      return "text-amber-700"; // Bronze
    default:
      return "";
  }
};

export const AgentsList = ({ agents, chains }: { agents: AgentsResponse; chains: ChainsResponse }) => {
  const [selectedChainId, setSelectedChainId] = useState<string | null>(null);

  // Sort agents by deposit amount for competition
  const topAgents = useMemo(() => {
    return [...agents].sort((a, b) => (b.vaultDepositAmount || 0) - (a.vaultDepositAmount || 0)).slice(0, 3);
  }, [agents]);

  const uniqueChains = useMemo(() => {
    const chainsMap = new Map(
      chains.map((chain) => [
        chain.chainId,
        {
          chainId: chain.chainId,
          name: chain.name,
          count: 0,
        },
      ]),
    );
    agents.forEach((agent) => {
      if (!agent.chain) return;
      if (chainsMap.has(agent.chain.chainId)) {
        const current = chainsMap.get(agent.chain.chainId);
        if (current) {
          chainsMap.set(agent.chain.chainId, {
            chainId: agent.chain.chainId,
            name: current.name,
            count: current.count + 1,
          });
        }
      }
    });
    return Array.from(chainsMap.values()).sort((a, b) => b.count - a.count);
  }, [agents, chains]);

  const filteredAgents = useMemo(() => {
    if (!selectedChainId) return agents;
    return agents.filter((agent) => agent.chain?.chainId === selectedChainId);
  }, [agents, selectedChainId]);

  /* Temporary Metrics */
  const [metricsMap, setMetricsMap] = useState<
    Record<
      string,
      {
        apy: number;
      }
    >
  >({});

  useEffect(() => {
    const newMetricsMap = filteredAgents.reduce(
      (acc, agent) => {
        acc[agent.id] = {
          apy: +(Math.random() * 25).toFixed(1),
        };
        return acc;
      },
      {} as Record<string, any>,
    );

    setMetricsMap(newMetricsMap);
  }, []);

  return (
    <div className="flex w-full flex-col items-start gap-8">
      {/* Competition Section */}
      <div className="flex w-full flex-col items-start gap-4">
        <h2 className="text-20/heading text-gray-950">🏆 Competition</h2>
        <div className="flex w-full flex-col items-start">
          {topAgents.map((agent, index) => (
            <div key={agent.id} className="relative w-full">
              {index < 3 && (
                <div className={`absolute -left-1 top-4 z-10 ${getCrownColor(index)}`}>
                  <Icon name="CrownFilled" className="h-6 w-6" />
                </div>
              )}
              <AgentElement
                agentId={agent.id}
                chainId={agent.chain?.chainId ?? ""}
                name={agent.name}
                description={agent.description}
                depositNum={agent.vaultDepositNumber || 0}
                depositAmount={agent.vaultDepositAmount || 0}
                apy={12.5}
                lastElement={index === topAgents.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
      {/* All Vaults Section */}
      <div className="flex w-full flex-col items-start gap-4">
        <h2 className="text-20/heading text-gray-950">🏦 All Vaults</h2>
        {/* Network Filter */}
        <div className="flex w-full items-center gap-2 overflow-x-auto scrollbar-hide">
          {uniqueChains.map((chain) => (
            <NetworkFilterElement
              key={chain.chainId}
              chainId={chain.chainId}
              name={chain.name}
              number={chain.count}
              selected={selectedChainId === chain.chainId}
              onClick={() => setSelectedChainId((prev) => (prev === chain.chainId ? null : chain.chainId))}
            />
          ))}
        </div>
        {/* List */}
        <div className="flex w-full flex-col items-start">
          {filteredAgents.map((agent, index) => {
            const metrics = metricsMap[agent.id] || {
              depositNum: 0,
              depositAmount: 0,
              apy: 0,
            };
            return (
              <AgentElement
                key={agent.id}
                agentId={agent.id}
                chainId={agent.chain?.chainId ?? ""}
                name={agent.name}
                description={agent.description}
                depositNum={agent.vaultDepositNumber || 0}
                depositAmount={agent.vaultDepositAmount || 0}
                apy={metrics.apy}
                lastElement={index === filteredAgents.length - 1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
