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
        "bg-slate-200",
        "text-blue-500",
        "border-black",
        "hover:bg-slate-300",
      ],
    },
    size: {
      small: ["text-sm", "rounded-md", "py-1", "px-2", "h-6"],
      medium: ["text-base", "rounded-lg", "py-2", "px-6", "h-10", "font-bold"],
      large: ["text-xl", "rounded-lg", "py-3", "px-8", "h-12", "font-bold"],
    },
  },
  compoundVariants: [],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export default function Button({ className, intent, size, ...props }: Props) {
  return <button className={button({ intent, size, className })} {...props} />;
}
