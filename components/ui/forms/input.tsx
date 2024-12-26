"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  forcedTheme?: "light" | "dark";
  bgColorLight?: string;
  textColorLight?: string;
  bgColorDark?: string;
  textColorDark?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      isError,
      forcedTheme,
      bgColorLight,
      textColorLight,
      bgColorDark,
      textColorDark,
      ...props
    },
    ref
  ) => {
    const radius = 100;
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    }

    const isDark = forcedTheme === "dark";
    const isLight = forcedTheme === "light";
    const themeClasses = forcedTheme
      ? isDark
        ? `${bgColorDark || "bg-secondary-dark"} ${
            textColorDark || "text-primary-light"
          } placeholder-text-secondary-light`
        : `${bgColorLight || "bg-secondary-light"} ${
            textColorLight || "text-primary-dark"
          } placeholder-text-secondary-dark`
      : `
          dark:${bgColorDark || "bg-secondary-dark"} dark:${
          textColorDark || "text-primary-light"
        } dark:placeholder-text-secondary-light 
          ${bgColorLight || "bg-secondary-light"} ${
          textColorLight || "text-primary-dark"
        } placeholder-text-secondary-dark
        `;

    const shadowClasses = isError
      ? "border-2 focus-visible:ring-red-600 shadow-[0px_0px_1px_1px_var(--red-700)]"
      : isDark
      ? "shadow-[0px_0px_1px_1px_var(--secondary-dark)] focus-visible:ring-primary-brand"
      : isLight
      ? "shadow-[0px_0px_1px_1px_var(--secondary-light)]  dark:shadow-[0px_0px_1px_1px_var(--secondary-dark)]  focus-visible:ring-primary-brand"
      : "shadow-[0px_0px_1px_1px_var(--tertiary-light)]  dark:shadow-[0px_0px_1px_1px_var(--tertiary-dark)]  focus-visible:ring-primary-brand";
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          ${isError ? "var(--red-500)" : "var(--primary-brand)"} ,
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
        <input
          type={type}
          className={cn(
            `flex h-10 w-full border-none ${themeClasses} rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent 
            file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-[2px]
            disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none transition duration-400
            ${shadowClasses}`,
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);

Input.displayName = "Input";

export { Input };
