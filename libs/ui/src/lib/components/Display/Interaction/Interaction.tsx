import clsx from "clsx";
import type { UIProps } from "../../../props";

export interface InteractionProps extends UIProps.Div {
  hover?: boolean;
  focus?: boolean;
  active?: boolean;
}

export const Interaction = ({ className, hover = true, focus = true, active = true, ...props }: InteractionProps) => {
  return (
    <div
      className={clsx(
        "absolute inset-0 bg-gray-950 opacity-0 transition-opacity duration-300",
        hover && "group-hover:opacity-[0.06]",
        focus && "group-focus:opacity-[0.06]",
        active && "group-active:opacity-[0.12]",
        className,
      )}
      {...props}
    />
  );
};
