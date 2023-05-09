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
        small: ["w-6", "h-6"],
        medium: ["w-10", "h-10"],
        large: ["w-16", "h-16"],
        full: ["w-full", "h-full"],
      },
    },
    compoundVariants: [],
    defaultVariants: {
      size: "medium",
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
