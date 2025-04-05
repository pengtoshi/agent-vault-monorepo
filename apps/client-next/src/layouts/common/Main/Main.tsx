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

export const BottomBlur = () => {
  return (
    <>
      <div className="fixed bottom-[10%] left-1/2 right-0 z-10 h-16 w-full max-w-[600px] -translate-x-1/2 bg-gradient-to-t from-gray-50 to-gray-50/20" />
      <div className="fixed bottom-0 left-1/2 right-0 z-10 h-[10%] w-full max-w-[600px] -translate-x-1/2 bg-gray-50" />
    </>
  );
};

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
          "relative flex min-h-screen w-full max-w-[600px] flex-col items-center justify-start bg-gray-50",
          className,
        )}
        {...props}
      >
        {/* Meta */}
        {meta}
        {/* Header */}
        {!hideHeader && header}
        {/* Main Content */}
        <div className="pb-safe-bottom flex w-full max-w-[600px] flex-1 flex-col items-stretch justify-start gap-6 px-4 py-6">
          {children}
        </div>
        {/* Bottom Navigation */}
        {!hideBottomNavigation ? <BottomNavigation /> : <BottomBlur />}
      </div>
    </div>
  );
};
