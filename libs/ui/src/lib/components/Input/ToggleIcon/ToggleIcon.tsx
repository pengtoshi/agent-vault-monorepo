import clsx from "clsx";
import { useEffect, useState } from "react";
import type { UIProps } from "../../../props";
import { Interaction } from "../../Display/Interaction/Interaction";
import { Icon } from "../../Icon/Icon";
import type { IconProps } from "../../Icon/Icon";

export interface ToggleIconProps extends UIProps.Button {
  active: boolean;
  name: IconProps["name"];
  handleClick: () => void;
}

export const ToggleIcon = ({ active, handleClick, className, name, ...props }: ToggleIconProps) => {
  const [internalActive, setInternalActive] = useState(active);

  useEffect(() => {
    setInternalActive(active);
  }, [active]);

  return (
    <button
      type="button"
      className={clsx("group relative", className)}
      onClick={() => {
        setInternalActive(!internalActive);
        handleClick();
      }}
      {...props}
    >
      <Icon className={internalActive ? "text-primary-500" : "text-gray-400"} name={name} />
      <Interaction focus={false} className={clsx("-left-1 -top-1 h-8 w-8 rounded-full")} />
    </button>
  );
};
