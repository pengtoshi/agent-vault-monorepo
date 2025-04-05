import { useRouter } from "next/router";
import { useState } from "react";
import type { Address } from "viem";
import { useAccount, useBalance, useWriteContract } from "wagmi";
import { Button, Modal, Slider } from "@libs/ui";
import type { ModalAction } from "@libs/ui";
import { formatNumber } from "@libs/utils-client";
import { AgentVault__factory, ERC20__factory } from "@apps/typechains";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenAddress: Address;
  vaultAddress: Address;
}

type TransactionState = "default" | "approving" | "approved" | "depositing" | "completed";

const TransactionStateText: Record<TransactionState, string> = {
  default: "Approve",
  approving: "Approving...",
  approved: "Deposit",
  depositing: "Depositing...",
  completed: "Completed",
};

export const DepositModal = ({ isOpen, onClose, tokenAddress, vaultAddress }: DepositModalProps) => {
  const router = useRouter();
  const { address } = useAccount();
  const [amount, setAmount] = useState(0);
  const [txState, setTxState] = useState<TransactionState>("default");

  const { data: balance } = useBalance({
    address,
    token: tokenAddress,
  });

  const { writeContractAsync } = useWriteContract();

  const handleMax = () => {
    if (balance) {
      setAmount(Number(balance.formatted));
    }
  };

  const handleApprove = async () => {
    if (!address || !balance) return;

    try {
      setTxState("approving");
      await writeContractAsync({
        address: tokenAddress,
        abi: ERC20__factory.abi,
        functionName: "approve",
        args: [vaultAddress, BigInt(amount * 10 ** balance.decimals)],
      });
      setTxState("approved");
    } catch (error) {
      console.error(error);
      setTxState("default");
    }
  };

  const handleDeposit = async () => {
    if (!address || !balance) return;

    try {
      setTxState("depositing");
      await writeContractAsync({
        address: vaultAddress,
        abi: AgentVault__factory.abi,
        functionName: "deposit",
        args: [BigInt(amount * 10 ** balance.decimals), address],
      });
      setTxState("completed");
      router.push(`/mypage`);
    } catch (error) {
      console.error(error);
      setTxState("approved");
    }
  };

  const actions: ModalAction[] = [
    {
      label: TransactionStateText[txState],
      onClick: txState === "default" ? handleApprove : handleDeposit,
      disabled: amount === 0 || txState === "approving" || txState === "depositing",
    },
  ];

  return (
    <Modal
      open={isOpen}
      onOpenChange={onClose}
      size="small"
      title="Deposit Tokens"
      actions={actions}
      actionsDirection="column"
    >
      <div className="flex flex-col gap-6">
        {/* Available Balance Section */}
        {/* <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-14/body text-gray-600">Available Balance</span>
            <Button
              variant="outlinedPrimary"
              size="small"
              onClick={handleMax}
              disabled={txState !== "default" && txState !== "approved"}
              className="h-6 px-2 py-0.5 text-12/body"
            >
              MAX
            </Button>
          </div>
          <span className="text-18/heading font-semibold text-gray-900">
            {balance ? formatNumber(Number(balance.formatted)) : "0"} {balance?.symbol}
          </span>
        </div> */}
        {/* Amount to Deposit Section */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-end">
            <span className="text-16/body/emp font-semibold text-gray-900">
              {formatNumber(amount)} {balance?.symbol}
            </span>
            <div className="w-full px-2">
              <Slider value={amount} onChange={setAmount} max={balance ? Number(balance.formatted) : 0} step={0.1} />
            </div>
            <div className="flex items-center gap-0.5">
              <span className="text-12/body text-gray-600">
                {balance ? formatNumber(Number(balance.formatted)) : "0"} {balance?.symbol}
              </span>
              <Button
                variant="textPrimary"
                size="small"
                onClick={handleMax}
                disabled={txState !== "default" && txState !== "approved"}
                className="h-6 px-2 py-0.5 text-12/body"
              >
                MAX
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
