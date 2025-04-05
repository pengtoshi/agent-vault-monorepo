import { useState } from "react";
import { Button, Textfield } from "@libs/ui";
import { Patterns } from "@libs/utils-client";

interface VaultDeployFormProps {
  onDeploy: () => Promise<void>;
}

type TokenAddressInputState = "default" | "valid" | "invalid";
type DeployState = "default" | "deploying" | "deployed";

const DeployStateText: Record<DeployState, string> = {
  default: "Deploy Vault",
  deploying: "Deploying...",
  deployed: "Deployed",
};

export const VaultDeployForm = ({ onDeploy }: VaultDeployFormProps) => {
  const [deployState, setDeployState] = useState<DeployState>("default");
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenAddressState, setTokenAddressState] = useState<TokenAddressInputState>("default");

  const validateTokenAddress = (address: string) => {
    if (address === "") {
      setTokenAddressState("default");
    } else if (Patterns.ETHEREUM_ADDRESS.test(address)) {
      setTokenAddressState("valid");
    } else {
      setTokenAddressState("invalid");
    }
  };

  const handleDeploy = async () => {
    try {
      setDeployState("deploying");
      await onDeploy();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 text-16/body font-semibold">Vault Deployment Guide</h3>
        <p className="text-14/body text-gray-600">
          To create an agent, you need to deploy a Vault smart contract. After deployment, anyone can deposit tokens
          into the vault and earn rewards.
        </p>
      </div>
      <Textfield
        label="Choose Token"
        placeholder="Select a token to deposit"
        required
        value={tokenAddress}
        onChange={(e) => {
          setTokenAddress(e.target.value);
          validateTokenAddress(e.target.value);
        }}
        error={tokenAddressState === "invalid" ? "Invalid token address" : undefined}
      />
      <Button
        onClick={handleDeploy}
        disabled={deployState !== "default" || tokenAddressState !== "valid"}
        className="w-full"
      >
        {DeployStateText[deployState]}
      </Button>
    </div>
  );
};
