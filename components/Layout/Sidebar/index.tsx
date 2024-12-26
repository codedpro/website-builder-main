import React, { useState, useEffect } from "react";
import { Sidebar } from "react-pro-sidebar";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Layout/Sidebar/SidebarItem";
import {  SidebarStyles } from "@/types/Sidebar";
import { FaChevronLeft } from "react-icons/fa";
import { SidebarItemType } from "@/types/SidebarItemType";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  logoDark: string;
  logoLight: string;
  sidebarItems: SidebarItemType[];
  lightModeStyles: SidebarStyles;
  darkModeStyles: SidebarStyles;
  isRtl: boolean;
}

const SidebarComponent: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  logoDark,
  logoLight,
  sidebarItems,
  lightModeStyles,
  darkModeStyles,
  isRtl,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isArrowClicked, setIsArrowClicked] = useState(true);

  useEffect(() => {
    setCollapsed(!sidebarOpen);
  }, [sidebarOpen]);

  const handleMouseEnter = () => {
    if (collapsed && !isArrowClicked) {
      setCollapsed(false);
    }
  };

  const handleMouseLeave = () => {
    if (!collapsed && !isArrowClicked) {
      setCollapsed(true);
    }
  };

  const toggleArrowBehavior = () => {
    setIsArrowClicked(!isArrowClicked);
    setCollapsed(false);
  };

  if (!sidebarOpen) {
    return null;
  }

  return (
    <>
      <div className="hidden dark:flex z-30 transition-width duration-300 ease-in-out">
        <Sidebar
          rtl={isRtl}
          collapsed={collapsed}
          toggled={sidebarOpen}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onBackdropClick={() =>
            window.innerWidth < 768 ? setSidebarOpen(false) : null
          }
          breakPoint="md"
          transitionDuration={90}
          rootStyles={darkModeStyles}
          backgroundColor={darkModeStyles.backgroundColor}
        >
          <div className="sidebar-header flex items-center justify-center py-4">
            <Link href="/">
              <Image
                width={500}
                height={500}
                src={logoDark || "/images/logo.png"}
                alt="Logo"
                priority
                className="dark:block w-36 hidden"
                draggable={false}
              />
            </Link>
            <Link href="/">
              <Image
                width={500}
                height={500}
                src={logoLight}
                alt="Logo"
                priority
                className="dark:hidden w-36"
                draggable={false}
              />
            </Link>
          </div>

          <ul>
            {sidebarItems.map((item, index) => (
              <SidebarItem key={index} item={item} collapsed={collapsed} />
            ))}
          </ul>

          <div
            onClick={toggleArrowBehavior}
            className="sidebar-footer absolute bottom-0 right-0 flex items-center justify-end py-2 pr-2 w-full bg-[#f3f4f6] dark:bg-[#122031] hover:opacity/80"
            style={{ backgroundColor: darkModeStyles.borderColor }}
          >
            <FaChevronLeft
              size={20}
              className={`transition-transform text-dark dark:text-white ${
                isArrowClicked ? "" : "rotate-180"
              }`}
            />
          </div>
        </Sidebar>
      </div>
      <div className="flex dark:hidden transition-width duration-300 ease-in-out">
        <Sidebar
          rtl={isRtl}
          collapsed={collapsed}
          toggled={sidebarOpen}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onBackdropClick={() =>
            window.innerWidth < 768 ? setSidebarOpen(false) : null
          }
          breakPoint="md"
          transitionDuration={90}
          rootStyles={lightModeStyles}
          backgroundColor={lightModeStyles.backgroundColor}
        >
          <div className="sidebar-header flex items-center justify-center py-4">
            <Link href="/">
              <Image
                width={500}
                height={500}
                src={logoDark}
                alt="Logo"
                priority
                className="dark:block w-36 hidden"
                draggable={false}
              />
            </Link>
            <Link href="/">
              <Image
                width={500}
                height={500}
                src={logoLight || "/images/logo.png"}
                alt="Logo"
                priority
                className="dark:hidden w-36"
                draggable={false}
              />
            </Link>
          </div>

          <ul>
            {sidebarItems.map((item, index) => (
              <SidebarItem key={index} item={item} collapsed={collapsed} />
            ))}
          </ul>

          <div
            onClick={toggleArrowBehavior}
            className="sidebar-footer absolute bottom-0 right-0 flex items-center justify-end py-2 pr-2 w-full bg-[#f3f4f6] dark:bg-[#122031] hover:opacity/80"
            style={{ backgroundColor: lightModeStyles.borderColor }}
          >
            <FaChevronLeft
              size={20}
              className={`transition-transform text-dark dark:text-white ${
                isArrowClicked ? "" : "rotate-180"
              }`}
            />
          </div>
        </Sidebar>
      </div>
    </>
  );
};

export default SidebarComponent;
