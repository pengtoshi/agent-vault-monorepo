import { useLogin } from "@privy-io/react-auth";
import { BottomSheet } from "@libs/ui";

export interface LoginSheetProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const LoginSheet = ({ trigger, open, onOpenChange }: LoginSheetProps) => {
  const { login } = useLogin();
  return (
    <BottomSheet
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      contents={
        <div className="flex w-full flex-col items-center justify-center gap-2 px-10">
          <span className="text-center text-18/heading text-gray-950">AI-Driven Vaults for DeFi Excellence</span>
          <span className="text-center text-14/body text-gray-600">
            Empower your DeFi investments with AI-driven vaults that adapt to every market shift.
          </span>
        </div>
      }
      closeButton={false}
      actions={[{ label: "Get Started", onClick: () => login() }]}
    />
  );
};
