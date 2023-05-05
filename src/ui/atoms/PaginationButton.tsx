import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const paginationButton = cva(["px-2", "py-2"], {
  variants: {
    position: {
      left: ["rounded-l-md"],
      center: ["px-4"],
      right: ["rounded-r-md"],
    },
    intent: {
      enable: ["bg-white", "text-gray-900"],
      disable: ["bg-white", "text-gray-400", "cursor-default"],
      highlight: ["bg-indigo-600", "text-white", "cursor-default"],
    },
  },
});

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof paginationButton> {}

export default function PaginationButton({
  className,
  position,
  intent,
  onClick,
  ...props
}: Props) {
  return (
    <button
      className={paginationButton({ intent, position, className })}
      onClick={onClick && intent === "enable" ? onClick : () => {}}
      {...props}
    />
  );
}
