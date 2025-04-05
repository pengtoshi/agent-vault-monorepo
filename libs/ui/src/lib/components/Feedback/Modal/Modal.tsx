import clsx from "clsx";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../../../shadcn";
import { Button } from "../../Input/Button/Button";

export interface ModalAction {
  label: string;
  onClick: () => void;
}

export interface ModalProps extends React.ComponentProps<typeof Dialog> {
  trigger?: React.ReactNode;
  size?: "small" | "medium";
  title?: string;
  description?: string;
  actions?: ModalAction[];
  actionsDirection?: "row" | "column";
  closeButton?: boolean;
  closeText?: string;
}

export const Modal = ({
  trigger,
  size = "small",
  title,
  description,
  actions,
  actionsDirection = "row",
  closeButton = true,
  closeText = "Close",
  ...props
}: ModalProps) => {
  return (
    <Dialog {...props}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className={clsx(size === "small" ? "max-w-[320px]" : "max-w-[480px]")}>
        <div className="flex w-full items-start justify-between">
          <div className="flex w-full flex-col gap-1">
            {title && <span className="text-16/body/emp text-gray-950">{title}</span>}
            {description && <span className="text-14/body text-gray-600">{description}</span>}
          </div>
        </div>
        <div className={clsx("flex w-full", actionsDirection === "row" ? "flex-row gap-3" : "flex-col gap-2")}>
          {closeButton && actionsDirection === "row" && (
            <DialogClose asChild>
              <Button className="flex-1" variant="outlinedPrimary">
                {closeText}
              </Button>
            </DialogClose>
          )}
          {actions?.map((action) => (
            <Button
              className={clsx(actionsDirection === "row" ? "flex-1" : "w-full")}
              key={action.label}
              onClick={action.onClick}
              variant="solid"
            >
              {action.label}
            </Button>
          ))}
          {closeButton && actionsDirection === "column" && (
            <DialogClose asChild>
              <Button className="w-full" variant="outlinedPrimary">
                {closeText}
              </Button>
            </DialogClose>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
