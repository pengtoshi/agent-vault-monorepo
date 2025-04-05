import { useRouter } from "next/router";
import { Icon } from "@libs/ui";

export const CreateAgentButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/agents/create")}
      className="relative flex w-full items-center justify-between gap-2 rounded-md bg-gray-950 px-5 py-4"
    >
      <div className="absolute -left-4 top-0">
        <Icon name="Agent" size={130} className="rotate-[14deg] text-gray-50/10" />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-16/body/emp text-gray-50">Create Agent Vault</span>
        <span className="text-14/body text-gray-400">Create your own agent vault and earn fees!</span>
      </div>
      <Icon name="ChevronRight" size={20} className="text-gray-50" />
    </button>
  );
};
