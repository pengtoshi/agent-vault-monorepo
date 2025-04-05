import type { AgentResponse } from "@libs/graphql";

type OverviewTabProps = {
  agentInfo: AgentResponse;
};

type RiskLevel = 1 | 2 | 3 | 4 | 5;

const RISK_LEVEL_DESCRIPTIONS: Record<RiskLevel, string> = {
  1: "This Vault has a very low risk level. It employs stable investment strategies and minimizes exposure to market volatility.",
  2: "This Vault has a low risk level. It uses conservative investment strategies with limited exposure to market volatility.",
  3: "This Vault has a medium risk level. It employs balanced investment strategies with moderate exposure to market volatility.",
  4: "This Vault has a high risk level. It uses aggressive investment strategies with significant exposure to market volatility.",
  5: "This Vault has a very high risk level. It employs highly aggressive investment strategies with substantial exposure to market volatility.",
};

const RISK_LEVEL_LABELS: Record<RiskLevel, string> = {
  1: "Very Low",
  2: "Low",
  3: "Medium",
  4: "High",
  5: "Very High",
};

export const OverviewTab = ({ agentInfo }: OverviewTabProps) => {
  const riskLevel = (agentInfo.riskLevel || 3) as RiskLevel;
  const riskLevelBgColor: Record<RiskLevel, string> = {
    1: "bg-green-500",
    2: "bg-green-400",
    3: "bg-yellow-500",
    4: "bg-orange-500",
    5: "bg-red-500",
  };
  const riskLevelTextColor: Record<RiskLevel, string> = {
    1: "text-green-500",
    2: "text-green-400",
    3: "text-yellow-500",
    4: "text-orange-500",
    5: "text-red-500",
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Strategy */}
      <div className="flex w-full flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="text-16/body/emp text-gray-950">Strategy</h3>
        <p className="text-14/body text-gray-700">
          {agentInfo.prompt ||
            "This agent performs optimal investment strategies. It automatically reallocates assets according to market conditions to maximize returns."}
        </p>
      </div>
      {/* Risk Assessment */}
      <div className="flex w-full flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="text-16/body/emp text-gray-950">Risk Assessment</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-14/body text-gray-700">Risk Level:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <span
                key={level}
                className={`h-2 w-2 rounded-full ${level <= riskLevel ? riskLevelBgColor[riskLevel] : "bg-gray-200"}`}
              />
            ))}
          </div>
          <span className={`text-14/body font-medium ${riskLevelTextColor[riskLevel]}`}>
            {RISK_LEVEL_LABELS[riskLevel]}
          </span>
        </div>
        <p className="text-14/body text-gray-700">{RISK_LEVEL_DESCRIPTIONS[riskLevel]}</p>
      </div>
    </div>
  );
};
