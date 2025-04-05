import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../utils/utils";

const buttonVariants = cva(
  "group w-fit inline-flex items-center justify-center whitespace-nowrap rounded-md transition-all duration-300 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        solid: "bg-primary-500 !text-gray-50 disabled:bg-gray-150 disabled:text-gray-350",
        outlinedPrimary:
          "bg-transparent border border-primary-500 !text-primary-500 disabled:border-gray-300 disabled:!text-gray-350",
        outlinedAssertive: "bg-transparent border border-gray-300 !text-gray-950 disabled:!text-gray-350",
        textPrimary: "bg-transparent !text-primary-500 disabled:!text-gray-350 !px-2",
        textAssertive: "bg-transparent !text-gray-600 disabled:!text-gray-350 !px-2",
      },
      size: {
        small: "h-8 px-4 text-14/button gap-1",
        medium: "h-10 px-5 text-14/button gap-1.5",
        large: "h-12 px-6 text-16/button gap-1.5",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "medium",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
