import clsx from "clsx";
import { useEffect, useState } from "react";
import type { UIProps } from "../../../props";

export interface SwitchProps extends UIProps.Button {
  active: boolean;
  handleClick: () => void;
  size?: "small" | "medium";
  disabled?: boolean;
}

const SwitchSize = {
  toggle: {
    small: "h-[14px] w-[14px]",
    medium: "h-[22px] w-[22px]",
  },
  container: {
    small: "h-[18px] w-8",
    medium: "h-[26px] w-12",
  },
};

const getTranslateClass = (active: boolean, size: "small" | "medium") => {
  if (!active) return "translate-x-0";
  return size === "medium" ? "translate-x-[22px]" : "translate-x-[14px]";
};

export const Switch = ({ active, handleClick, size = "medium", className, ...props }: SwitchProps) => {
  const [internalActive, setInternalActive] = useState(active);

  useEffect(() => {
    setInternalActive(active);
  }, [active]);

  return (
    <button
      type="button"
      className={clsx(
        "relative z-10 flex-shrink-0 rounded-full transition-colors duration-300 disabled:opacity-40",
        SwitchSize.container[size],
        internalActive ? "bg-primary-500" : "bg-gray-300",
        className,
      )}
      onClick={() => {
        setInternalActive(!internalActive);
        handleClick();
      }}
      {...props}
    >
      <div
        className={clsx(
          "absolute left-0.5 top-0.5 z-20 flex-shrink-0 rounded-full bg-gray-100 shadow-toggle transition-transform duration-300",
          SwitchSize.toggle[size],
          getTranslateClass(internalActive, size),
        )}
      />
    </button>
  );
};
