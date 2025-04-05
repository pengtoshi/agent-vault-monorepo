import clsx from "clsx";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "../../../shadcn";
import { Button } from "../../Input/Button/Button";

export interface BottomSheetAction {
  label: string;
  onClick: () => void;
}

export interface BottomSheetProps {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  contents?: React.ReactNode;
  actions?: BottomSheetAction[];
  actionsDirection?: "row" | "column";
  closeButton?: boolean;
  closeText?: string;
}

export const BottomSheet = ({
  trigger,
  title,
  description,
  contents,
  actions,
  actionsDirection = "row",
  closeButton = true,
  closeText = "Close",
  ...props
}: BottomSheetProps) => {
  return (
    <Drawer {...props}>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="flex w-full flex-col gap-1">
          {title && <span className="text-16/body/emp text-gray-950">{title}</span>}
          {description && <span className="text-14/body text-gray-600">{description}</span>}
        </div>
        {contents}
        <div className={clsx("flex w-full", actionsDirection === "row" ? "flex-row gap-3" : "flex-col gap-2")}>
          {closeButton && actionsDirection === "row" && (
            <DrawerClose asChild>
              <Button className="flex-1" variant="outlinedPrimary">
                {closeText}
              </Button>
            </DrawerClose>
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
            <DrawerClose asChild>
              <Button className="w-full" variant="textPrimary">
                {closeText}
              </Button>
            </DrawerClose>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
