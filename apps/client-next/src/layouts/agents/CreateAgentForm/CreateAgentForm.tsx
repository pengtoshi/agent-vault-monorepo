import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import type { ChainsResponse } from "@libs/graphql";
import type { CreateAgentInput } from "@libs/model";
import { Button } from "@libs/ui";
import { BasicInfoForm } from "./BasicInfoForm/BasicInfoForm";
import { VaultDeployForm } from "./VaultDeployForm/VaultDeployForm";

export const CreateAgentForm = ({ chains }: { chains: ChainsResponse }) => {
  const [step, setStep] = useState<"basic" | "vault">("basic");
  const [vaultAddress, setVaultAddress] = useState<string | null>(null);

  const methods = useForm<CreateAgentInput>({
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      prompt: "",
      chainId: undefined,
      accountAddress: "",
      accountPrivateKey: "",
      vaultAddress: "",
    },
  });

  const { handleSubmit, setValue, watch, formState } = methods;
  const { name, description, prompt, chainId } = watch();

  const isBasicInfoValid = Boolean(name && description && prompt && chainId);

  const handleBasicInfoSubmit = async (data: CreateAgentInput) => {
    // Generate account
    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount(privateKey);

    // Set account info to form state
    setValue("accountAddress", account.address);
    setValue("accountPrivateKey", privateKey);

    setStep("vault");
  };

  const handleVaultDeploy = async () => {
    // TODO: Implement vault deployment
    // Mock implementation
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    setVaultAddress("0x1234...5678");
  };

  const onSubmit = async (data: CreateAgentInput) => {
    if (step === "basic") {
      await handleBasicInfoSubmit(data);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full w-full flex-col justify-between gap-6">
        {step === "basic" ? (
          <>
            <BasicInfoForm chains={chains} />
            <Button type="submit" disabled={!isBasicInfoValid} className="w-full">
              Next
            </Button>
          </>
        ) : (
          <>
            <VaultDeployForm onDeploy={handleVaultDeploy} />
            <div className="flex flex-col gap-3">
              <Button type="button" variant="outlinedPrimary" onClick={() => setStep("basic")} className="w-full">
                Back
              </Button>
              <Button type="submit" disabled={!vaultAddress} className="w-full">
                Create Agent
              </Button>
            </div>
          </>
        )}
      </form>
    </FormProvider>
  );
};
