import React, { useState } from "react";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import styles from "./StyledPhoneInput.module.css";

interface StyledPhoneInputProps extends PhoneInputProps {
  error?: boolean;
}

const StyledPhoneInput: React.FC<StyledPhoneInputProps> = ({
  value,
  onChange,
  error,
  ...props
}) => {
  const radius = 100;
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${
              visible ? radius + "px" : "0px"
            } circle at ${mouseX}px ${mouseY}px,
            ${error ? "var(--red-500)" : "var(--primary-brand)"},
            transparent 80%
          )
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="p-[2px] rounded-lg transition duration-300 group/input"
    >
      <PhoneInput
        value={value}
        onChange={onChange}
        inputProps={{
          ...props.inputProps,
          className: cn(
            `!flex !h-10 !w-full !border-none !bg-[#1a1a1a] !text-primary-light !rounded-md !px-3 !py-2 !pl-14 !text-sm
            !placeholder-neutral-400 !focus-visible:outline-none !focus-visible:ring-[2px] ${
              error
                ? "shadow-[0px_0px_1px_1px_var(--red-500)]"
                : "shadow-[0px_0px_1px_1px_var(--zinc-800)]"
            }
       !disabled:cursor-not-allowed !disabled:opacity-50`,
            styles.formControl
          ),
        }}
        containerClass={`${styles.phoneInputContainer} phone-input-container`}
        buttonClass={`!bg-[#1a1a1a] !text-white !border-none`}
        dropdownClass={`!bg-[#1a1a1a] !text-white !absolute`}
        {...props}
      />
    </motion.div>
  );
};

export { StyledPhoneInput };
