import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconButton, type UIProps } from "@libs/ui";

const HeaderProgressBar = ({ progressPercent }: { progressPercent: number }) => {
  return (
    <div className="absolute left-0 right-0 top-0 z-10 flex h-[3px] flex-col items-center justify-center">
      <div className="max-w-limit flex h-[3px] w-full flex-row items-center justify-start bg-gray-50">
        <motion.div
          className="flex h-[3px] bg-primary-500"
          animate={{
            width: `${progressPercent}%`,
          }}
          initial={{
            width: "0px",
          }}
          transition={{
            type: "spring",
            duration: 0.5,
          }}
        />
      </div>
    </div>
  );
};

interface HeaderProps extends UIProps.Div {
  progressPercent?: number;
  hideBackButton?: boolean;
  hideLogo?: boolean;
  title?: string;
  onBack?: () => void;
}

export const Header = ({
  progressPercent,
  onBack,
  hideBackButton = false,
  hideLogo = false,
  title,
  className,
  ...props
}: HeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className={clsx("sticky top-0 z-20 flex w-full flex-col items-center justify-center", className)} {...props}>
      <div className="max-w-limit relative z-20 flex h-14 w-full flex-row items-center justify-between gap-4 bg-gray-50 px-4 transition-colors">
        {typeof progressPercent === "number" && <HeaderProgressBar progressPercent={progressPercent} />}
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            {!hideBackButton && <IconButton onClick={handleBack} name="ChevronLeft" size={24} />}
            {!hideLogo && (
              <Link href="/">
                <span className="text-24/heading italic text-primary-500">🗡️ Yield Royale</span>
              </Link>
            )}
          </div>
          {title && <div className="text-18/heading text-gray-950">{title}</div>}
          <div className="flex items-center gap-4">
            <IconButton name="Search" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};
