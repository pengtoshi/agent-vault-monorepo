import clsx from "clsx";
import type { UIProps } from "../../../props";

export interface LabelProps extends UIProps.Label {
  label: React.ReactNode;
  required?: boolean;
}

export const Label = ({ label, required = false, className, htmlFor, ...props }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        "flex h-[18px] items-center justify-between self-stretch text-14/body/emp text-gray-600",
        className,
      )}
      {...props}
    >
      <span className="whitespace-nowrap">
        {label}
        {required && <span className="ml-[2px] text-primary-500">*</span>}
      </span>
    </label>
  );
};
