import React, { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(["button", "flex", "justify-center", "items-center"], {
  variants: {
    intent: {
      primary: [
        "bg-blue-500",
        "text-white",
        "border-black",
        "hover:bg-blue-600",
      ],
      secondary: [
        "bg-white",
        "text-gray-800",
        "border-gray-400",
        "hover:bg-slate-200",
      ],
    },
    size: {
      small: ["text-sm", "rounded-md", "py-1", "px-2", "h-6"],
      medium: ["text-base", "rounded-lg", "py-2", "px-6", "h-10"],
    },
  },
  compoundVariants: [{ intent: "primary", size: "medium", class: "font-bold" }],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export default function Button({
  className,
  intent,
  size,
  ...props
}: ButtonProps) {
  return <button className={button({ intent, size, className })} {...props} />;
}
