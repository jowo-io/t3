import React, { HTMLAttributes } from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";

const avatar = cva(
  [
    "inline-block",
    "flex",
    "justify-center",
    "items-center",
    "rounded-full",
    "overflow-hidden",
    "aspect-square",
  ],
  {
    variants: {
      size: {
        sm: ["w-sm", "h-sm"],
        md: ["w-md", "h-md"],
        lg: ["w-lg", "h-lg"],
        xl: ["w-xl", "h-xl"],
        full: ["w-full", "h-full"],
      },
    },
    compoundVariants: [],
    defaultVariants: {
      size: "md",
    },
  }
);

interface Props
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof avatar> {
  src: string;
  alt?: string;
}

export default function Avatar({ className, size, src, alt, ...props }: Props) {
  return (
    <span className={avatar({ size, className })} {...props}>
      <img
        src={src}
        alt={alt || "Avatar"}
        className={cx(
          "block",
          "max-w-full",
          "max-h-full",
          "w-full",
          "h-full",
          "object-cover"
        )}
      />
    </span>
  );
}
