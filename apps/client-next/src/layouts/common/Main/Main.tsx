import clsx from "clsx";
import { BottomNavigation } from "../BottomNavigation/BottomNavigation";
import { Header } from "../Header/Header";

interface MainProps {
  meta?: React.ReactNode;
  header?: React.ReactNode;
  hideHeader?: boolean;
  hideBottomNavigation?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Main = ({
  meta,
  header = <Header />,
  hideHeader = false,
  hideBottomNavigation = false,
  className,
  children,
  ...props
}: MainProps) => {
  return (
    <div className="flex min-h-screen w-full justify-center">
      <div
        className={clsx(
          "flex min-h-screen w-full max-w-[600px] flex-col items-center justify-start bg-gray-50",
          className,
        )}
        {...props}
      >
        {/* Meta */}
        {meta}
        {/* Header */}
        {!hideHeader && header}
        {/* Main Content */}
        <div className="pb-safe-bottom flex w-full max-w-[600px] flex-1 flex-col items-stretch justify-start px-4 py-6">
          {children}
        </div>
        {/* Bottom Navigation */}
        {!hideBottomNavigation && <BottomNavigation />}
      </div>
    </div>
  );
};
