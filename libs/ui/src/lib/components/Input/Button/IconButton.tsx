import clsx from "clsx";
import type { UIProps } from "../../../props";
import { Icon } from "../../Icon/Icon";
import type { IconProps } from "../../Icon/Icon";

export interface IconButtonProps extends UIProps.Button {
  disabled?: boolean;
  name: IconProps["name"];
  size?: IconProps["size"];
  iconClassName?: string;
}

export const IconButton = ({ disabled = false, className, name, size, iconClassName, ...props }: IconButtonProps) => {
  return (
    <button type="button" disabled={disabled} className={clsx("group", className)} {...props}>
      <Icon name={name} size={size} className={clsx("text-gray-950 group-disabled:text-gray-350", iconClassName)} />
    </button>
  );
};
