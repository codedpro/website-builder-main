"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { NavbarMenuItemType } from "@/types/Navbar";

interface MenuItemProps {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  type: NavbarMenuItemType;
  content?: React.ReactNode;
  href?: string;
}

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem: React.FC<MenuItemProps> = ({
  setActive,
  active,
  item,
  type,
  content,
  href,
}) => {
  const handleMouseEnter = () => {
    if (content) {
      setActive(item);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget as HTMLElement;

    if (
      relatedTarget &&
      "closest" in relatedTarget &&
      !relatedTarget.closest(`#dropdown-${item}`) &&
      !relatedTarget.closest(`#menu-item-${item}`) &&
      !relatedTarget.closest(`#hover-zone-${item}`)
    ) {
      setActive(null);
    }
  };

  const MenuItemContent = (
    <motion.p
      transition={{ duration: 0.3 }}
      className="cursor-pointer font-semibold text-primary-dark dark:text-primary-light"
    >
      {item}
    </motion.p>
  );

  return (
    <div
      id={`menu-item-${item}`}
      onMouseEnter={type !== "single" ? handleMouseEnter : undefined}
      onMouseLeave={type !== "single" ? handleMouseLeave : undefined}
      className="relative px-4 py-2 rounded-lg hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors"
    >
      {type === "single" && href ? (
        <Link href={href}>{MenuItemContent}</Link>
      ) : (
        MenuItemContent
      )}

      {type !== "single" && active === item && content && (
        <AnimatePresence>
          <>
            <div
              key={`hover-zone-${item}`}
              id={`hover-zone-${item}`}
              className="absolute left-0 top-full w-full h-8"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            ></div>
            <motion.div
              key={`dropdown-${item}`}
              id={`dropdown-${item}`}
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={transition}
              className="absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2 pt-2 z-50"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              layoutId="dropdown"
            >
              <motion.div
                transition={transition}
                className="bg-primary-light dark:bg-primary-dark backdrop-blur-md rounded-xl overflow-hidden border border-secondary-light dark:border-secondary-dark shadow-2xl"
                style={{ transform: "translateX(-50%)" }}
              >
                <div className="w-max h-full p-4 relative">{content}</div>
              </motion.div>
            </motion.div>
          </>
        </AnimatePresence>
      )}
    </div>
  );
};
