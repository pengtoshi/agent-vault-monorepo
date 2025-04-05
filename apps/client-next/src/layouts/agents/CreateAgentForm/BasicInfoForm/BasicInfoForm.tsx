import { useFormContext } from "react-hook-form";
import { useSwitchChain } from "wagmi";
import type { ChainsResponse } from "@libs/graphql";
import { Button, Dropdown, Label, Textarea, Textfield } from "@libs/ui";

interface BasicInfoFormProps {
  chains: ChainsResponse;
}

export const BasicInfoForm = ({ chains }: BasicInfoFormProps) => {
  const { switchChain } = useSwitchChain();
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();

  const { name, description, prompt, chainId, riskLevel } = watch();
  const isValid = Boolean(name && description && prompt && chainId && riskLevel);

  const handleNetworkChange = (newChainName: string) => {
    const newChainId = chains.find((chain) => chain.name === newChainName)?.chainId;
    if (!newChainId) return;
    setValue("chainId", newChainId);
    switchChain({ chainId: Number(newChainId) });
  };

  const riskLevelOptions = ["1", "2", "3", "4", "5"];

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex w-full flex-col gap-4">
        <Textfield
          {...register("name", { required: "Name is required." })}
          label="Agent Name"
          required
          placeholder="Enter the name of the agent"
          error={errors.name?.message as string}
        />
        <Textfield
          {...register("description", { required: "Description is required." })}
          label="Agent Description"
          required
          placeholder="Enter the description of the agent"
          error={errors.description?.message as string}
        />
        <Textarea
          {...register("prompt", { required: "Prompt is required." })}
          label="Agent Strategy"
          required
          placeholder="Enter the strategy of the agent"
          maxLength={1000}
          error={errors.prompt?.message as string}
        />
        <div className="flex flex-col items-start gap-1.5">
          <Label label="Network" required />
          <span className="text-12/body text-gray-600">Vault will be deployed on the selected network.</span>
          <Dropdown
            {...register("chainId", { required: "Chain is required." })}
            options={chains.map((chain) => chain.name)}
            onSelect={handleNetworkChange}
            error={errors.chainId?.message as string}
          />
        </div>
        <div className="flex flex-col items-start gap-1.5">
          <Label label="Risk Level" required />
          <span className="text-12/body text-gray-600">
            If the risk level is high, the agent will take more risk and vice versa.
          </span>
          <Dropdown
            {...register("riskLevel", { required: "Risk level is required." })}
            options={riskLevelOptions}
            onSelect={(value) => setValue("riskLevel", Number(value))}
            error={errors.riskLevel?.message as string}
          />
        </div>
      </div>
      <Button type="submit" disabled={!isValid} className="w-full">
        Next
      </Button>
    </div>
  );
};
