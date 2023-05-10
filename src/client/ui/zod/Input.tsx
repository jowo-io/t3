import React, { forwardRef, InputHTMLAttributes, Ref } from "react";
import { cx } from "class-variance-authority";

interface Props extends InputHTMLAttributes<HTMLElement> {
  className?: string;
  label?: string;
  error?: string | null;
}

export default forwardRef<HTMLInputElement, Props>(function Input(
  { className, label, name, error, ...props }: Props,
  ref
) {
  return (
    <div className={cx("mb-sm", className)}>
      <label className="block text-white" htmlFor={name}>
        {label}
      </label>
      <input
        className="w-full rounded border p-4px"
        id={name}
        name={name}
        ref={ref}
        {...props}
      />
      {error && <div className="mt-xs text-negative">{error}</div>}
    </div>
  );
});
