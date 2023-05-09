import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const iconButton = cva(
  [
    "font-bold",
    "p-xs",
    "drop-shadow-sm",
    "flex",
    "justify-center",
    "items-center",
  ],
  {
    variants: {
      position: {
        left: ["rounded-l-md"],
        center: ["px-sm"],
        right: ["rounded-r-md"],
        standalone: ["rounded-md"],
      },
      intent: {
        enable: ["bg-white", "text-gray-900", "hover:bg-gray-100"],
        disable: ["bg-white", "text-gray-400", "cursor-default"],
        highlight: ["bg-neutral", "text-white", "cursor-default"],
      },
      size: {
        sm: ["w-sm", "h-sm"],
        md: ["w-md", "h-md"],
        lg: ["w-lg", "h-lg"],
      },
    },
    defaultVariants: {
      intent: "enable",
      size: "md",
    },
  }
);

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButton> {}

export default function IconButton({
  className,
  position,
  intent,
  size,
  onClick,
  children,
  ...props
}: Props) {
  return (
    <button
      className={iconButton({ intent, position, size, className })}
      onClick={onClick && intent === "enable" ? onClick : () => {}}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}
