import React, { ReactNode, HTMLAttributes } from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";

const defaultTag = "h1";

const header = cva(
  ["my-0", "max-w-full", "font-bold", "leading-1", "font-header"],
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
      color: {
        white: "text-white",
        black: "text-black",
      },
    },
    defaultVariants: {
      tag: defaultTag,
      color: "white",
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

export interface Props
  extends Omit<HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof header> {
  options?: ReactNode;
}

export default function Header({
  tag,
  color,
  children,
  className,
  options,
  ...props
}: Props) {
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
      {...props}
    >
      <Tag className={header({ tag, color })}>{children}</Tag>
      {options && (
        <div className={cx("flex", "items-center", "justify-center")}>
          {options}
        </div>
      )}
    </div>
  );
}
