import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";

export const ProfileCard = () => {
  const { user } = usePrivy();

  const shortenAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-3xl bg-white p-6 shadow-lg">
      <div className="border-3 border-primary relative h-[120px] w-[120px] overflow-hidden rounded-full">
        <Image src="/profile-avatar.svg" alt="Profile" layout="fill" objectFit="cover" className="bg-primary-50" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800">My Wallet</h2>
      <div className="text-sm w-full break-all rounded-xl bg-gray-50 px-4 py-2 text-center text-gray-600">
        {user?.wallet?.address ? shortenAddress(user.wallet.address) : "No wallet connected"}
      </div>
    </div>
  );
};
