"use client";

import { textVariant2 } from "@/utils/motions";
import { motion } from "framer-motion";

type TitleTextProps = {
  title: string;
  textStyles?: string;
  isRtl?: boolean;
};

export const TitleText: React.FC<TitleTextProps> = ({
  title,
  textStyles = "",
  isRtl,
}) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    dir={isRtl ? "rtl" : ""}
    className={` font-bold md:text-[64px] text-[40px] dark:text-primary-light text-primary-dark ${textStyles}`}
  >
    {title}
  </motion.h2>
);
