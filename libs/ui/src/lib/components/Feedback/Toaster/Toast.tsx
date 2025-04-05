import clsx from "clsx";
import { toast as sonnerToast } from "sonner";
import type { UIProps } from "../../../props";
import { Icon } from "../../Icon/Icon";
import type { IconProps } from "../../Icon/Icon";
import { Button } from "../../Input/Button/Button";

export interface ToastProps extends Omit<UIProps.Div, "id"> {
  id: string | number;
  title: string;
  type?: "success" | "error" | "info";
  description?: string;
  button?: {
    label: string;
    onClick: () => void;
  };
  showIcon?: boolean;
}

const iconMap: Record<NonNullable<ToastProps["type"]>, IconProps["name"]> = {
  success: "CircleCheckFilled",
  error: "CircleErrorFilled",
  info: "CircleInfoFilled",
};

const colorMap: Record<NonNullable<ToastProps["type"]>, string> = {
  success: "text-etc-positive",
  error: "text-etc-negative",
  info: "text-gray-50",
};

export const Toast = ({ id, title, type = "info", description, button, showIcon = true }: ToastProps) => {
  return (
    <div className="flex w-[360px] items-center justify-between gap-3 rounded-md bg-gray-950 px-4 py-3">
      <div className="flex items-center justify-start gap-2">
        {showIcon && <Icon size={20} name={iconMap[type]} className={colorMap[type]} />}
        <div className="flex flex-col gap-1">
          <p className={clsx("text-14/body/emp", colorMap[type])}>{title}</p>
          {description && <p className="text-12/body text-gray-400">{description}</p>}
        </div>
      </div>
      {!!button && (
        <Button
          size="small"
          className="!w-fit !bg-gray-50 !text-gray-950"
          onClick={() => {
            button.onClick();
            sonnerToast.dismiss(id);
          }}
        >
          {button.label}
        </Button>
      )}
    </div>
  );
};
