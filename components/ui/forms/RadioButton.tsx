"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

const RadioButton = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { isRtl?: boolean }
>(({ className, children, isRtl = false, ...props }, ref) => {
  return (
    <Label
      className={cn(
        "flex items-center cursor-pointer select-none transition-all",
        isRtl ? "space-x-reverse space-x-1" : "space-x-1",
        "hover:bg-secondary-light dark:hover:bg-secondary-dark p-2 rounded-lg",
        className 
      )}
    >
      <input
        type="radio"
        className="absolute opacity-0 h-0 w-0 peer"
        ref={ref}
        {...props}
      />

      <div
        className={cn(
          "h-3 w-3 flex items-center justify-center rounded-full border-2 transition-all",
          "peer-checked:bg-primary-brand peer-checked:border-primary-brand",
          "border-secondary-light dark:border-secondary-dark"
        )}
      >
        <div
          className={cn(
            "h-2 w-2 bg-white rounded-full scale-0 transition-transform",
            "peer-checked:scale-100"
          )}
        ></div>
      </div>
      <span
        className={cn(
          "text-primary-dark dark:text-primary-light text-xs font-medium",
          isRtl ? "mr-2" : "ml-2"
        )}
      >
        {children}
      </span>
    </Label>
  );
});

RadioButton.displayName = "RadioButton";

export { RadioButton };
