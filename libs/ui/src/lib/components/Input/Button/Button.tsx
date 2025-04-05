import clsx from "clsx";
import { Button as ShadcnButton } from "../../../shadcn";
import type { ButtonProps as ShadcnButtonProps } from "../../../shadcn";
import { Interaction } from "../../Display/Interaction/Interaction";

export type ButtonProps = ShadcnButtonProps & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const interactionClasses = {
  solid: "",
  outlinedPrimary: "!bg-primary-500",
  outlinedAssertive: "",
  textPrimary: "!bg-primary-500",
  textAssertive: "",
};

export const Button = ({ children, leftIcon, rightIcon, className, ...props }: ButtonProps) => {
  return (
    <ShadcnButton {...props} className={clsx("relative overflow-hidden", className)}>
      <Interaction focus={false} className={interactionClasses[props.variant ?? "solid"]} />
      {leftIcon}
      <span className="relative z-10">{children}</span>
      {rightIcon}
    </ShadcnButton>
  );
};
