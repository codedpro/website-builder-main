"use client";

import React, { useState } from "react";
import AdminServices from "./AdminServices";
import AdminResources from "./AdminResources";
import AdminSchedules from "./AdminSchedules";
import AdminTimeBlocks from "./AdminTimeBlocks";

export default function AdminBookingManager() {
  const [activeTab, setActiveTab] = useState<
    "services" | "resources" | "schedules" | "timeblocks"
  >("services");

  return (
    <div
      className="
   
      "
    >
      <h1 className="text-3xl font-bold mb-4 text-primary-brand dark:text-primary-lightuser">
        پنل مدیریت رزرو
      </h1>

      {/* Tab Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab("services")}
          className={`
            px-4 py-2 rounded 
            transition-colors
            ${
              activeTab === "services"
                ? "bg-primary-brand text-primary-light dark:text-primary-lightuser hover:bg-secondary-brand"
                : "bg-primary-lightuser text-primary-dark dark:bg-secondary-darkuser dark:text-primary-light hover:bg-secondary-lightuser dark:hover:bg-tertiary-darkuser"
            }
          `}
        >
          خدمات
        </button>

        <button
          onClick={() => setActiveTab("resources")}
          className={`
            px-4 py-2 rounded 
            transition-colors
            ${
              activeTab === "resources"
                ? "bg-primary-brand text-primary-light dark:text-primary-lightuser hover:bg-secondary-brand"
                : "bg-primary-lightuser text-primary-dark dark:bg-secondary-darkuser dark:text-primary-light hover:bg-secondary-lightuser dark:hover:bg-tertiary-darkuser"
            }
          `}
        >
          منابع
        </button>

        <button
          onClick={() => setActiveTab("schedules")}
          className={`
            px-4 py-2 rounded 
            transition-colors
            ${
              activeTab === "schedules"
                ? "bg-primary-brand text-primary-light dark:text-primary-lightuser hover:bg-secondary-brand"
                : "bg-primary-lightuser text-primary-dark dark:bg-secondary-darkuser dark:text-primary-light hover:bg-secondary-lightuser dark:hover:bg-tertiary-darkuser"
            }
          `}
        >
          زمان‌بندی
        </button>

        <button
          onClick={() => setActiveTab("timeblocks")}
          className={`
            px-4 py-2 rounded 
            transition-colors
            ${
              activeTab === "timeblocks"
                ? "bg-primary-brand text-primary-light dark:text-primary-lightuser hover:bg-secondary-brand"
                : "bg-primary-lightuser text-primary-dark dark:bg-secondary-darkuser dark:text-primary-light hover:bg-secondary-lightuser dark:hover:bg-tertiary-darkuser"
            }
          `}
        >
          تایم بلاک‌ها
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "services" && <AdminServices />}
        {activeTab === "resources" && <AdminResources />}
        {activeTab === "schedules" && <AdminSchedules />}
        {activeTab === "timeblocks" && <AdminTimeBlocks />}
      </div>
    </div>
  );
}
