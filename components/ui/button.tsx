import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 cursor-pointer",
          variant === "default" && "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200",
          variant === "outline" && "border border-neutral-300 bg-transparent hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
