import { NetworkIcon } from "@libs/ui";
import { TokenLogo } from "../TokenLogo/TokenLogo";

export const AgentVaultLogo = ({ chainId, tokenImageUrl }: { chainId: string; tokenImageUrl?: string }) => {
  return (
    <div className="relative p-1">
      <TokenLogo tokenImageUrl={tokenImageUrl} size={52} />
      <div className="absolute bottom-0 right-0">
        <NetworkIcon chainId={chainId} size={24} />
      </div>
    </div>
  );
};
