import clsx from "clsx";
import { useEffect, useState } from "react";
import type { UIProps } from "../../../props";
import { Interaction } from "../../Display/Interaction/Interaction";

export interface RadioProps extends UIProps.Button {
  active: boolean;
  handleClick: () => void;
  size?: "small" | "medium";
  disabled?: boolean;
}

const RadioSize = {
  small: "h-5 w-5",
  medium: "h-6 w-6",
};

const InteractionSize = {
  small: "h-7 w-7",
  medium: "h-8 w-8",
};

export const Radio = ({ active, handleClick, size = "medium", disabled, className, ...props }: RadioProps) => {
  const [internalActive, setInternalActive] = useState(active);

  useEffect(() => {
    setInternalActive(active);
  }, [active]);

  return (
    <button
      type="button"
      className={clsx("group relative p-0.5 disabled:opacity-40", RadioSize[size], className)}
      disabled={disabled}
      onClick={() => {
        setInternalActive(!internalActive);
        handleClick();
      }}
      {...props}
    >
      <div
        className={clsx(
          "h-full w-full rounded-full bg-gray-50",
          internalActive ? "border-[5px] border-primary-500" : "border-[1.5px] border-gray-300",
        )}
      />
      {!disabled && (
        <Interaction focus={false} className={clsx("-left-1 -top-1 rounded-full", InteractionSize[size])} />
      )}
    </button>
  );
};
