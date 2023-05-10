import React, { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(["flex", "justify-center", "items-center"], {
  variants: {
    intent: {
      primary: [
        "bg-primary",
        "text-secondary",
        "border-off-black",
        "hover:bg-primary-dark",
      ],
      secondary: [
        "bg-secondary",
        "text-primary",
        "border-off-black",
        "hover:bg-secondary-dark",
      ],
    },
    size: {
      sm: ["text-sm", "rounded-md", "py-xs", "px-xs", "h-md"],
      md: ["text-md", "rounded-lg", "py-xs", "px-md", "h-lg", "font-bold"],
      lg: ["text-xl", "rounded-lg", "py-xs", "px-md", "h-xl", "font-bold"],
    },
  },
  compoundVariants: [],
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
});

export interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export default function Button({ className, intent, size, ...props }: Props) {
  return <button className={button({ intent, size, className })} {...props} />;
}
