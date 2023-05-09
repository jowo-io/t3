import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const iconButton = cva(
  [
    "button",
    "font-bold",
    "px-2",
    "py-2",
    "drop-shadow-sm",
    "flex",
    "justify-center",
    "items-center",
  ],
  {
    variants: {
      position: {
        left: ["rounded-l-md"],
        center: ["px-4"],
        right: ["rounded-r-md"],
        standalone: ["px-4", "rounded-md"],
      },
      intent: {
        enable: ["bg-white", "text-gray-900", "hover:bg-slate-100"],
        disable: ["bg-white", "text-gray-400", "cursor-default"],
        highlight: ["bg-indigo-600", "text-white", "cursor-default"],
      },
      size: {
        small: ["w-8", "h-8"],
        medium: ["w-10", "h-10"],
        large: ["w-12", "h-12"],
      },
    },
    defaultVariants: {
      intent: "enable",
      size: "medium",
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
