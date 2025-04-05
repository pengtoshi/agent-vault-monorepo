import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { formatAddress } from "@libs/utils-client";

export const ProfileCard = () => {
  const { user } = usePrivy();

  return (
    <div className="flex w-full items-center gap-4 rounded-3xl border border-gray-200 bg-gray-100 p-4">
      <div className="border-3 border-primary relative min-h-[60px] min-w-[60px] overflow-hidden rounded-full">
        <Image src="/profile-avatar.svg" alt="Profile" layout="fill" objectFit="cover" className="bg-primary-50" />
      </div>
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-18/heading font-semibold text-gray-950">My Wallet</h2>
        <div className="w-full break-all text-center text-16/body text-gray-600">
          {user?.wallet?.address ? formatAddress(user.wallet.address) : "No wallet connected"}
        </div>
      </div>
    </div>
  );
};
