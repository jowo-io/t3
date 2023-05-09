import React, { forwardRef, TextareaHTMLAttributes, Ref } from "react";
import { cx } from "class-variance-authority";

interface Props extends TextareaHTMLAttributes<HTMLElement> {
  className?: string;
  label?: string;
  error?: string | null;
}

export default forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { className, label, name, error, ...props }: Props,
  ref
) {
  return (
    <div className={cx("mb-sm", className)}>
      <label className="block text-white" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="w-full rounded border p-4px"
        id={name}
        name={name}
        rows={10}
        {...props}
        ref={ref}
      />
      {error && <div className="mt-xs text-negative">{error}</div>}
    </div>
  );
});
