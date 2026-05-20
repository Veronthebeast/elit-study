import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <label htmlFor={id} className="flex items-center gap-2 cursor-pointer group">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className={cn(
            "w-4 h-4 rounded border-border text-primary-600 focus:ring-primary-500",
            "cursor-pointer",
            className
          )}
          {...props}
        />
        {label && (
          <span className="text-sm text-foreground group-hover:text-primary-600 transition-colors">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
