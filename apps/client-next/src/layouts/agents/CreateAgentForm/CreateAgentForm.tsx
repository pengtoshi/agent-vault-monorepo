import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import type { ChainsResponse } from "@libs/graphql";
import { useCreateAgent } from "@libs/graphql";
import type { CreateAgentInput } from "@libs/model";
import { BasicInfoForm } from "./BasicInfoForm/BasicInfoForm";
import { VaultDeployForm } from "./VaultDeployForm/VaultDeployForm";

export const CreateAgentForm = ({ chains }: { chains: ChainsResponse }) => {
  /* Hooks */
  const router = useRouter();
  const [createAgent] = useCreateAgent();

  /* Internal State */
  const [step, setStep] = useState<"basic" | "vault">("basic");

  /* Form */
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
      tokenAddress: "",
    },
  });
  const { handleSubmit, setValue } = methods;

  const handleBasicInfoSubmit = () => {
    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount(privateKey);

    setValue("accountAddress", account.address);
    setValue("accountPrivateKey", privateKey);
    setStep("vault");
  };

  const onSubmit = async (data: CreateAgentInput) => {
    if (step === "basic") {
      handleBasicInfoSubmit();
      return;
    }
    await createAgent({ variables: { input: data } });
    router.push("/agents");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full w-full flex-col justify-between gap-6">
        {step === "basic" ? (
          <BasicInfoForm chains={chains} />
        ) : (
          <VaultDeployForm chains={chains} onBack={() => setStep("basic")} />
        )}
      </form>
    </FormProvider>
  );
};
