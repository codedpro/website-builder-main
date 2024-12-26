"use client";

import React from "react";
import { FaCheck } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface CheckboxOption {
  label: string;
  value: string | number;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  name: string;
  selectedValues: (string | number)[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  isError?: boolean;
  isRtl?: boolean;
}

const CheckboxGroup = React.forwardRef<HTMLInputElement, CheckboxGroupProps>(
  (
    {
      options,
      name,
      selectedValues,
      onChange,
      onBlur,
      className,
      isError = false,
      isRtl = false,
    },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col space-y-4", className)}>
        {options.map((option, index) => (
          <label
            key={index}
            className={cn(
              "flex items-center cursor-pointer p-3 rounded-lg transition-all",
              isRtl ? "space-x-reverse space-x-3" : "space-x-3",
              "hover:bg-secondary-light dark:hover:bg-secondary-dark",
              isError ? "border-red-500" : "border-transparent"
            )}
          >
            <div className="relative h-6 w-6 flex items-center justify-center">
              <input
                type="checkbox"
                name={name}
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                className="absolute h-0 w-0 opacity-0"
              />
              <div
                className={cn(
                  "h-6 w-6 rounded-lg border transition-all",
                  selectedValues.includes(option.value)
                    ? "bg-primary-brand border-primary-brand"
                    : "border-tertiary-light dark:border-tertiary-dark"
                )}
              ></div>
              {selectedValues.includes(option.value) && (
                <FaCheck
                  className="absolute text-white text-sm"
                  style={{ pointerEvents: "none" }}
                />
              )}
            </div>
            <span
              className={cn(
                "text-secondary-dark dark:text-secondary-light text-sm font-medium",
                isRtl ? "mr-3" : "ml-3"
              )}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";

export { CheckboxGroup };
