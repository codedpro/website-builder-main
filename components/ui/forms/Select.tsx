"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  isError?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, isError, ...props }, ref) => {
    const radius = 100;
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    }

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
        className="p-[2px] rounded-lg transition duration-300 group/select"
      >
        <select
          className={cn(
            `appearance-none flex h-10 w-full border-none dark:bg-secondary-dark bg-secondary-light text-primary-dark dark:text-primary-light rounded-md px-3 py-2 text-sm  
            file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-text-tertiary-dark dark:placeholder-text-tertiary-light
            focus-visible:outline-none focus-visible:ring-[2px] 
            disabled:cursor-not-allowed disabled:opacity-50
           
            group-hover/input:shadow-none transition duration-400
        ${
          isError
            ? "border-2 focus-visible:ring-red-600 shadow-[0px_0px_1px_1px_var(--red-700)]"
            : "focus-visible:ring-primary-brand dark:shadow-[0px_0px_1px_1px_var(--tertiary-dark)] shadow-[0px_0px_1px_1px_var(--tertiary-light)]"
        } 
            `,
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
      </motion.div>
    );
  }
);

Select.displayName = "Select";

export { Select };
