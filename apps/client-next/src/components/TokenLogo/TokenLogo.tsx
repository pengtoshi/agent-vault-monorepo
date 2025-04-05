import clsx from "clsx";
import Image from "next/image";

const getDefaultFontSize = (size: number) => {
  if (size <= 16) {
    return "text-12/body";
  }
  if (size <= 24) {
    return "text-14/body";
  }
  if (size <= 32) {
    return "text-16/body";
  }
  return "text-18/heading";
};

export const TokenLogo = ({ tokenImageUrl, size = 24 }: { tokenImageUrl?: string; size?: number }) => {
  if (tokenImageUrl) {
    return <Image src={tokenImageUrl} alt="token" width={size} height={size} />;
  }
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full bg-gray-400 text-gray-50",
        getDefaultFontSize(size),
      )}
      style={{ width: size, height: size }}
    >
      ?
    </div>
  );
};
