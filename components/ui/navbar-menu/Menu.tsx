"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll, useMotionValueEvent } from "framer-motion";

interface MenuProps {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}

export const Menu: React.FC<MenuProps> = ({ setActive, children }) => {
  const { scrollYProgress } = useScroll();
  const [isTop, setIsTop] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (current < 0.02) {
      setIsTop(true);
      setVisible(true);
    } else {
      setIsTop(false);
      setVisible(current < scrollYProgress.getPrevious()!);
    }
  });

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        onMouseLeave={() => setActive(null)}
        className={`fixed z-50 top-0 inset-x-0 mx-auto max-w-fit md:min-w-[70vw] lg:min-w-fit px-10 mt-3 py-4 ${
          isTop
            ? "bg-transparent rounded-none border-none shadow-none"
            : "bg-primary-light dark:bg-primary-dark rounded-full backdrop-blur-3xl shadow-2xl border border-secondary-light dark:border-secondary-dark"
        }`}
        style={{
          backdropFilter: isTop ? "none" : "blur(20px)",
        }}
      >
        <div
          className={`flex justify-center space-x-6 transition-all duration-300 ${
            isTop ? "space-x-16" : "space-x-6"
          }`}
        >
          {children}
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};
