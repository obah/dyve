import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background duration-300 ease-in-out transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-purple-1 text-black border border-transparent hover:bg-background hover:text-purple-1 hover:border-purple-1 ",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-purple-1 text-purple-1 bg-background hover:bg-purple-1 hover:text-black",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        auxBtn: "bg-purple-4 px-4 py-2 text-black-1 font-medium text-md",
        heroBtn:
          "bg-purple-1 text-lg text-black-1 py-4 px-8 hover:text-white hover:bg-primary/90",
        withdraw:
          "border-2 border-purple-2 from-[#C239F4] to-[#71218E] text-lg text-white font-semibold p-2 hover:text-white hover:bg-primary/90",
        deposit:
          "bg-gradient-to-r from-[#C239F4] to-[#71218E] text-lg text-white font-semibold p-2 hover:text-white hover:bg-primary/90",
      },
      size: {
        default: "h-[60px] px-4 py-[30px]",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
