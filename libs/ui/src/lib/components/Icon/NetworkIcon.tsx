import type { SVGProps } from "react";
import { ReactComponent as Base } from "~/ui/public/icons/network/base.svg";
import { ReactComponent as Celo } from "~/ui/public/icons/network/celo.svg";
import { ReactComponent as Flow } from "~/ui/public/icons/network/flow.svg";
import { ReactComponent as Optimism } from "~/ui/public/icons/network/optimism.svg";
import { ReactComponent as Polygon } from "~/ui/public/icons/network/polygon.svg";
import { ReactComponent as Rootstock } from "~/ui/public/icons/network/rootstock.svg";
import { ReactComponent as Zircuit } from "~/ui/public/icons/network/zircuit.svg";

export const NetworkIconVariants = {
  Base,
  Celo,
  Flow,
  Optimism,
  Polygon,
  Rootstock,
  Zircuit,
};

type NetworkIconName = keyof typeof NetworkIconVariants;

export const NetworkIconNameByChainId: Record<string, NetworkIconName> = {
  84532: "Base", // Testnet(Sepolia)
  11155420: "Optimism", // Testnet(Sepolia)
  48899: "Zircuit", // Testnet
  80002: "Polygon", // Testnet(Amoy)
  31: "Rootstock", // Testnet
  44787: "Celo", // Testnet(Alfajores)
  545: "Flow", // Testnet
};

export interface NetworkIconProps extends SVGProps<SVGSVGElement> {
  chainId: string;
  size?: number;
}

export const NetworkIcon = ({ chainId, size = 24, className, ...props }: NetworkIconProps) => {
  const name = NetworkIconNameByChainId[chainId];
  const NetworkIconComponent = NetworkIconVariants[name];
  return <NetworkIconComponent {...props} width={size} height={size} className={className} />;
};
