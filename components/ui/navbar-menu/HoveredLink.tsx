"use client";

import React from "react";
import Link from "next/link";

interface HoveredLinkProps {
  children: React.ReactNode;
  href: string;
}

export const HoveredLink: React.FC<HoveredLinkProps> = ({
  children,
  href,
}) => {
  return (
    <Link
      href={href}
      className="text-secondary-dark dark:text-secondary-light hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
    >
      {children}
    </Link>
  );
};
