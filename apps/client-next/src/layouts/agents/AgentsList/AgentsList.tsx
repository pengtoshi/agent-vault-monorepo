import { useEffect, useMemo, useState } from "react";
import type { AgentsResponse, ChainsResponse } from "@libs/graphql";
import { AgentElement, NetworkFilterElement } from "./AgentsList.element";

export const AgentsList = ({ agents, chains }: { agents: AgentsResponse; chains: ChainsResponse }) => {
  const [selectedChainId, setSelectedChainId] = useState<string | null>(null);

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
        depositNum: number;
        depositAmount: number;
        apy: number;
      }
    >
  >({});

  useEffect(() => {
    const newMetricsMap = filteredAgents.reduce(
      (acc, agent) => {
        acc[agent.id] = {
          depositNum: Math.floor(Math.random() * 200) + 1,
          depositAmount: Math.floor(Math.random() * 2000) + 100,
          apy: +(Math.random() * 25).toFixed(1),
        };
        return acc;
      },
      {} as Record<string, any>,
    );

    setMetricsMap(newMetricsMap);
  }, []);

  return (
    <div className="flex w-full flex-col items-start gap-4">
      {/* Title */}
      <span className="text-20/heading text-gray-950">All Vaults</span>

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
        {filteredAgents.map((agent) => {
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
              depositNum={metrics.depositNum}
              depositAmount={metrics.depositAmount}
              apy={metrics.apy}
            />
          );
        })}
      </div>
    </div>
  );
};
