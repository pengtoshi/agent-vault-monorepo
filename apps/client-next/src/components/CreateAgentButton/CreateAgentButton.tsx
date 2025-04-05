import { useRouter } from "next/router";
import { Icon } from "@libs/ui";

export const CreateAgentButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/agents/create")}
      className="relative flex w-full items-center justify-between gap-2 overflow-hidden rounded-md bg-primary-500 px-5 py-4"
    >
      <div className="absolute -bottom-6 right-4 translate-x-[20%] translate-y-[20%]">
        <Icon name="Agent" size={200} className="-rotate-[14deg] text-gray-50/10" />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-left text-16/body/emp text-gray-50">Create Agent Vault</span>
        <span className="text-left text-14/body text-gray-250">Create vault with your own strategy and earn fees!</span>
      </div>
      <Icon name="ChevronRight" size={20} className="text-gray-50" />
    </button>
  );
};
