"use client";

import React, { useState, useEffect, forwardRef } from "react";
import Sidebar from "@/components/Layout/Sidebar";
import Header from "@/components/Layout/Header";
import Theme from "./providers/Theme";
import homeConfig from "@/lib/constants/homeConfig";

const UserLayout = forwardRef(function DefaultLayout(
  {
    className,
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  },
  ref?: React.Ref<HTMLDivElement>
) {
  const { main, UserSidebar, headerData } = homeConfig;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Theme>
      <div
        dir={main.isRtl ? "rtl" : ""}
        className="flex h-screen dark:bg-primary-darkuser bg-secondary-lightuser z-30 overflow-hidden bg-grid-black/[0.01] dark:bg-grid-white/[0.01]"
        ref={ref}
      >
        <Sidebar
          isRtl={main.isRtl}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          logoDark={main.logoDark}
          logoLight={main.logoLight}
          sidebarItems={UserSidebar.sidebarItems}
          lightModeStyles={UserSidebar.lightModeStyles}
          darkModeStyles={UserSidebar.darkModeStyles}
        />
        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header
            userPlaceholder={headerData.userPlaceholder}
            texts={headerData.texts}
            header={headerData.header}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            isRtl={main.isRtl}
          />
          <main>
            <div className={`mx-auto max-w-screen-2xl p-4 md:p-6 ${className}`}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </Theme>
  );
});

export default UserLayout;
