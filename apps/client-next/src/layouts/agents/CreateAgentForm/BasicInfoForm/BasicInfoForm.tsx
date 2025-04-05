import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { ChainsResponse } from "@libs/graphql";
import { Dropdown, Label, Textarea, Textfield } from "@libs/ui";

interface BasicInfoFormProps {
  chains: ChainsResponse;
}

export const BasicInfoForm = ({ chains }: BasicInfoFormProps) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
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
          onSelect={(name) => setValue("chainId", chains.find((chain) => chain.name === name)?.chainId)}
          error={errors.chainId?.message as string}
        />
      </div>
    </div>
  );
};
