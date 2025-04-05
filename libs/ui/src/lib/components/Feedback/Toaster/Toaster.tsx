import { toast as sonnerToast } from "sonner";
import { Toast } from "./Toast";
import type { ToastProps } from "./Toast";
import { Toaster as ShadcnToaster } from "../../../shadcn";

export interface ToasterProps extends React.ComponentProps<typeof ShadcnToaster> {
  className?: string;
}

export const Toaster = ({ ...props }: ToasterProps) => (
  <ShadcnToaster
    toastOptions={{
      className: "font-sans",
    }}
    {...props}
  />
);

/*
    Using custom components on sonner
    https://sonner.emilkowal.ski/styling#headless
*/
export const toast = (toastProps: Omit<ToastProps, "id">) => {
  return sonnerToast.custom((id) => <Toast {...toastProps} id={id} />);
};
