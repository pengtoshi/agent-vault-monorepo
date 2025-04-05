import type { EventFragment } from "ethers/lib/utils";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { Address } from "viem";
import { useAccount, usePublicClient, useReadContract, useWriteContract } from "wagmi";
import { NATIVE_CURRENCY_SYMBOLS, VAULT_FACTORY_ADDRESSES } from "@libs/constants";
import type { ChainsResponse } from "@libs/graphql";
import type { CreateAgentInput } from "@libs/model";
import { Button, Textfield } from "@libs/ui";
import { Patterns, getEventArgsFromReceipt } from "@libs/utils-client";
import { AgentVaultFactory__factory } from "@apps/typechains";

type TokenAddressInputState = "default" | "valid" | "invalid";
type DeployState = "default" | "deploying" | "deployed";

const DeployStateText: Record<DeployState, string> = {
  default: "Deploy Vault",
  deploying: "Deploying...",
  deployed: "Deployed",
};

interface VaultDeployFormProps {
  chains: ChainsResponse;
  onBack: () => void;
}

export const VaultDeployForm = ({ chains, onBack }: VaultDeployFormProps) => {
  /* Hooks */
  const { writeContractAsync, isSuccess, isPending, isError } = useWriteContract();
  const { address } = useAccount();
  const publicClient = usePublicClient();

  /* Form */
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<CreateAgentInput>();
  const { accountAddress, vaultAddress, tokenAddress, chainId } = watch();

  const vaultFactoryAddress = VAULT_FACTORY_ADDRESSES[Number(chainId)];

  const { data: agentInitialFund } = useReadContract({
    address: vaultFactoryAddress,
    abi: AgentVaultFactory__factory.abi,
    functionName: "agentInitialFund",
  }) as { data: bigint | undefined };

  /* Inputs */
  const [vaultName, setVaultName] = useState("");
  const [deployState, setDeployState] = useState<DeployState>("default");

  /* Deploy */
  const currentChainInfo = useMemo(() => chains.find((chain) => chain.chainId === chainId), [chains, chainId]);
  const blockExplorerUrl = currentChainInfo?.blockExplorerUrl;
  const defaultStrategyAddress = currentChainInfo?.strategies?.find((strategy) => strategy.default)?.address;

  const isDeployDisabled =
    deployState !== "default" ||
    vaultName === "" ||
    tokenAddress === "" ||
    !!errors.tokenAddress ||
    !defaultStrategyAddress ||
    !publicClient;

  const handleDeploy = async () => {
    if (isDeployDisabled || !agentInitialFund) return;
    try {
      const hash = await writeContractAsync({
        address: vaultFactoryAddress,
        abi: AgentVaultFactory__factory.abi,
        functionName: "createVault",
        args: [
          tokenAddress,
          defaultStrategyAddress,
          address,
          accountAddress,
          vaultName,
          vaultName.trim().toUpperCase(),
        ],
        value: agentInitialFund,
      });
      console.log(hash);
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      const eventArgs = getEventArgsFromReceipt(
        receipt,
        AgentVaultFactory__factory.abi.find((abi) => abi.name === "VaultCreated") as unknown as EventFragment,
      ) as { vault: Address };
      console.log(eventArgs);

      setValue("vaultAddress", eventArgs.vault);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(vaultAddress);

  useEffect(() => {
    if (isPending) {
      setDeployState("deploying");
    }
  }, [isPending]);

  useEffect(() => {
    if (isSuccess) {
      setDeployState("deployed");
    }
    if (isError) {
      setDeployState("default");
    }
  }, [isSuccess, isError]);

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="mb-2 text-16/body font-semibold">Vault Deployment</h3>
          <p className="text-14/body text-gray-600">
            To create an agent, you need to deploy a Vault smart contract.
            <br /> After deployment, anyone can deposit tokens into the vault and earn rewards.
          </p>
          {agentInitialFund === undefined ? (
            <div className="mt-2 rounded-lg bg-gray-50 p-3">
              <div className="animate-pulse space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-3 w-full rounded bg-gray-200" />
              </div>
            </div>
          ) : (
            <div className="mt-2 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-14/body text-gray-700">
                Required initial fund:{" "}
                <span className="font-semibold text-primary-600">
                  {Number(agentInitialFund) / 1e18} {NATIVE_CURRENCY_SYMBOLS[Number(chainId)]}
                </span>
              </p>
              <p className="mt-2 text-12/body text-gray-500">
                This amount will be transferred to the agent address as initial operating funds.
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Textfield
            label="Vault Name"
            placeholder="Enter the name of the vault"
            required
            value={vaultName}
            disabled={deployState !== "default"}
            onChange={(e) => setVaultName(e.target.value)}
          />
          <Textfield
            {...register("tokenAddress", {
              required: "Token address is required.",
              pattern: Patterns.ETHEREUM_ADDRESS,
            })}
            label="Choose Token"
            placeholder="Select a token to deposit"
            required
            disabled={deployState !== "default"}
            error={errors.tokenAddress?.message as string}
          />
          {deployState === "deployed" && (
            <div className="flex flex-col gap-1">
              <span className="text-14/body text-etc-positive">Vault deployed successfully!</span>
              {blockExplorerUrl && (
                <span className="text-12/body text-gray-400 underline">
                  <Link href={`${blockExplorerUrl}/address/${vaultAddress}`}>See on Explorer</Link>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start gap-3">
        <Button type="button" variant="outlinedPrimary" onClick={onBack} className="w-full">
          Back
        </Button>
        {deployState === "deployed" ? (
          <Button type="submit" disabled={!vaultAddress} className="w-full">
            Create Agent
          </Button>
        ) : (
          <Button type="button" onClick={handleDeploy} disabled={isDeployDisabled} className="w-full">
            {DeployStateText[deployState]}
          </Button>
        )}
      </div>
    </div>
  );
};
