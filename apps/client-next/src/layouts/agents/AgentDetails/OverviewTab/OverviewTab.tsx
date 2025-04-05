import type { AgentResponse } from "@libs/graphql";

type OverviewTabProps = {
  agentInfo: AgentResponse;
};

export const OverviewTab = ({ agentInfo }: OverviewTabProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Strategy */}
      <div className="flex w-full flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="text-16/body/emp text-gray-950">Strategy</h3>
        <p className="text-14/body text-gray-700">
          This agent{" "}
          {agentInfo.description ||
            "performs optimal investment strategies. It automatically reallocates assets according to market conditions to maximize returns."}
        </p>
      </div>
      {/* Risk Assessment */}
      <div className="flex w-full flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="text-16/body/emp text-gray-950">Risk Assessment</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-14/body text-gray-700">Risk Level:</span>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary-600" />
            <span className="h-2 w-2 rounded-full bg-primary-600" />
            <span className="h-2 w-2 rounded-full bg-primary-600" />
            <span className="h-2 w-2 rounded-full bg-gray-200" />
            <span className="h-2 w-2 rounded-full bg-gray-200" />
          </div>
          <span className="text-14/body font-medium text-primary-700">Medium</span>
        </div>
        <p className="text-14/body text-gray-700">
          This Vault has a medium level of risk. There may be value changes due to market volatility, but the AI agent
          continuously monitors and adjusts strategies to minimize risk.
        </p>
      </div>
    </div>
  );
};
