"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ProductItemProps {
  title: string;
  description: string;
  href: string;
  src: string;
  className?: string;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  title,
  description,
  href,
  src,
  className,
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-4 p-4 rounded-lg hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors duration-200 ${className}`}
    >
      <Image
        src={src}
        width={70}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-lg shadow-lg 
                   w-12 h-10 md:w-16 md:h-12 
                   object-cover"
      />
      <div>
        <h4 className="text-base md:text-lg font-bold text-primary-dark dark:text-primary-light">
          {title}
        </h4>
        <p className="text-xs md:text-sm text-secondary-dark dark:text-secondary-light">
          {description}
        </p>
      </div>
    </Link>
  );
};
