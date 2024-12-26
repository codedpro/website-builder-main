"use client";

import { motion, useAnimation } from "framer-motion";

type TypingTextProps = {
  title: string;
  textStyles?: string;
  isRtl?: boolean;
};

export const TypingText: React.FC<TypingTextProps> = ({
  title,
  textStyles = "",
  isRtl = false,
}) => {
  const controls = useAnimation();
  const textVariant = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, x: isRtl ? 20 : -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const handleViewportEnter = () => {
    controls.start("visible");
  };

  const handleViewportLeave = () => {
    controls.start("hidden");
  };

  const words = title.split(" ");

  return (
    <motion.p
      initial="hidden"
      animate={controls}
      variants={textVariant}
      onViewportEnter={handleViewportEnter}
      onViewportLeave={handleViewportLeave}
      dir={isRtl ? "rtl" : "ltr"}
      className={`font-normal text-[14px] text-secondary-dark dark:text-secondary-light ${textStyles} ${
        isRtl ? "text-right" : ""
      }`}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariant}
          style={{ display: "inline" }}
        >
          {word + (index < words.length - 1 ? "\u00A0" : "")}
        </motion.span>
      ))}
    </motion.p>
  );
};
