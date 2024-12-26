"use client";

import React, { useEffect, useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import {
  FaArrowLeft,
  FaArrowRight,
  FaSun,
  FaMoon,
  FaSpinner,
} from "react-icons/fa";
import { NavbarMenuItem } from "@/types/Navbar";
import { useTheme } from "next-themes";

interface FloatingNavbarProps {
  className?: string;
  menuItems: NavbarMenuItem[];
}

const FloatingNavbar: React.FC<FloatingNavbarProps> = ({
  className,
  menuItems,
}) => {
  const [active, setActive] = useState<string | null>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }
  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ",
        className
      )}
    >
      <Menu setActive={setActive}>
        {menuItems.map((menuItem) => (
          <MenuItem
            key={menuItem.id}
            setActive={setActive}
            active={active}
            item={menuItem.item}
            type={menuItem.type}
            href={menuItem.href}
            content={
              menuItem.type === "links" && menuItem.links ? (
                <div className="flex flex-col space-y-4 text-sm">
                  {menuItem.links.map((link, index) => (
                    <HoveredLink
                      href={link.href}
                      key={`${link.label}-${index}`}
                    >
                      <span className="group relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary-dark dark:bg-secondary-light transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </HoveredLink>
                  ))}
                </div>
              ) : menuItem.type === "products" && menuItem.products ? (
                <ProductsContent products={menuItem.products} />
              ) : null
            }
          />
        ))}

        <button
          key="theme-switcher"
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-full hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors duration-300"
          aria-label="Toggle Theme"
        >
          {resolvedTheme === "dark" ? (
            <FaSun className="text-primary-light" />
          ) : resolvedTheme === "light" ? (
            <FaMoon className="text-primary-dark" />
          ) : (
            <FaSpinner className="animate-spin text-primary-dark" />
          )}
        </button>
      </Menu>
    </div>
  );
};

interface ProductsContentProps {
  products: NavbarMenuItem["products"];
}

const ProductsContent: React.FC<ProductsContentProps> = ({ products }) => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const itemsPerPage = 4;
    const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 0;
  
    if (!products) return null;
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) =>
        prevPage < totalPages - 1 ? prevPage + 1 : prevPage
      );
    };
  
    const handlePreviousPage = () => {
      setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : prevPage));
    };
  
    return (
      <div className="relative text-sm p-4 max-w-sm mx-auto md:max-w-full"> {/* Responsive max-width */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className={`
                transition-all duration-300 ease-in-out 
                bg-secondary-light hover:bg-secondary-dark active:bg-tertiary-light 
                dark:bg-secondary-dark dark:hover:bg-secondary-light dark:active:bg-tertiary-dark 
                text-primary-dark dark:text-primary-light p-3 rounded-full shadow-xl 
                disabled:opacity-50 disabled:cursor-not-allowed
                transform hover:scale-105 disabled:hover:scale-100
              `}
              aria-label="Previous Page"
            >
              <FaArrowLeft />
            </button>
  
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className={`
                transition-all duration-300 ease-in-out 
                bg-secondary-light hover:bg-secondary-dark active:bg-tertiary-light 
                dark:bg-secondary-dark dark:hover:bg-secondary-light dark:active:bg-tertiary-dark 
                text-primary-dark dark:text-primary-light p-3 rounded-full shadow-xl 
                disabled:opacity-50 disabled:cursor-not-allowed
                transform hover:scale-105 disabled:hover:scale-100
              `}
              aria-label="Next Page"
            >
              <FaArrowRight />
            </button>
          </div>
        )}
        <div
          className={cn(
            "grid gap-6 animate-fade-in",
            "grid-cols-1 md:grid-cols-2"
          )}
        >
          {products
            .slice(
              currentPage * itemsPerPage,
              currentPage * itemsPerPage + itemsPerPage
            )
            .map((product, index) => (
              <ProductItem
                key={`${product.title}-${index}`}
                title={product.title}
                href={product.href}
                src={product.src}
                description={product.description}
                className="transition-transform duration-300 transform hover:scale-105"
              />
            ))}
        </div>
      </div>
    );
  };
export default FloatingNavbar;
