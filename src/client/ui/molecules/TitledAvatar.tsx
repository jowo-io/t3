import { HTMLAttributes } from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";

import Avatar, { Props as AvatarProps } from "@/client/ui/atoms/Avatar";

const titledAvatar = cva(["flex", "items-center"], {
  variants: {
    color: {
      white: "text-white",
      black: "text-black",
    },
    size: {
      sm: ["text-xs", "gap-4px"],
      md: ["text-sm", "gap-xs"],
      lg: ["text-md", "gap-xs"],
      xl: ["text-lg", "gap-sm"],
    },
    direction: {
      right: ["flex-row", "justify-start"],
      left: ["flex-row-reverse", "justify-end"],
    },
  },
  compoundVariants: [],
  defaultVariants: {
    color: "black",
    size: "md",
    direction: "right",
  },
});

export interface Props
  extends Omit<HTMLAttributes<HTMLElement>, "title" | "color">,
    VariantProps<typeof titledAvatar>,
    Pick<AvatarProps, "src" | "alt"> {
  className?: string;
  title?: string | null;
}

export default function TitledAvatar({
  className,
  title,
  src,
  alt,
  color,
  size,
  direction,
  ...props
}: Props) {
  return (
    <div
      className={titledAvatar({ color, size, direction, className })}
      {...props}
    >
      <Avatar
        size={size}
        src={src}
        alt={alt ? alt : title ? title : undefined}
      />
      <span>{title}</span>
    </div>
  );
}
