import React, { ReactNode, HTMLAttributes } from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";

const defaultTag = "h1";

const header = cva(
  ["my-0", "max-w-full", "font-bold", "leading-1", "text-white", "font-header"],
  {
    variants: {
      tag: {
        h1: ["text-title"],
        h2: ["text-header"],
        h3: ["text-xl"],
        h4: ["text-lg"],
        h5: ["text-md"],
        h6: ["text-sm"],
      },
    },
    defaultVariants: {
      tag: defaultTag,
    },
  }
);

const margins = {
  h1: "mb-md",
  h2: "mb-sm",
  h3: "mb-sm",
  h4: "mb-xs",
  h5: "mb-xs",
  h6: "mb-4px",
};

interface Props
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof header> {
  options?: ReactNode;
}

export default function Header({ children, tag, options, className }: Props) {
  const Tag = tag || defaultTag;
  return (
    <div
      className={cx(
        "flex",
        "w-full",
        "items-center",
        "justify-between",
        margins[Tag],
        className
      )}
    >
      <Tag className={header({ tag })}>{children}</Tag>
      {options && (
        <div className={cx("flex", "items-center", "justify-center")}>
          {options}
        </div>
      )}
    </div>
  );
}
