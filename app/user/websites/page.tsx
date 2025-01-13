"use client";

import UserLayout from "@/components/Layout/UserLayout";
import { Website } from "@/types/website";
import { useEffect, useState } from "react";
import {
  FaLink,
  FaGlobe,
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";

const textData = {
  loading: "در حال بارگذاری وبسایت‌ها...",
  errorPrefix: "خطا: ",
  noWebsites: "هیچ وبسایتی یافت نشد.",
  title: "وبسایت‌های شما",
  domain: "دامنه:",
  status: "وضعیت:",
  hostingStartDate: "تاریخ شروع میزبانی:",
  hostingEndDate: "تاریخ پایان میزبانی:",
  customerName: "نام مشتری:",
  customerEmail: "ایمیل مشتری:",
  customerPhone: "شماره تماس مشتری:",
};

const translateStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return {
        text: "فعال",
        color:
          "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200",
      };
    case "pending":
      return {
        text: "در انتظار فعال‌سازی",
        color:
          "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200",
      };
    case "disabled":
      return {
        text: "غیرفعال",
        color: "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200",
      };
    default:
      return {
        text: "نامشخص",
        color: "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      };
  }
};

export default function UserWebsitesList() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await fetch(`/api/website/registerer`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch websites: ${response.statusText}`);
        }

        const data = await response.json();

        setWebsites(data.data || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWebsites();
  }, []);

  if (loading) {
    return (
      <UserLayout>
        <p className="text-center text-primary-dark dark:text-primary-light">
          {textData.loading}
        </p>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout>
        <p className="text-center text-red-500">
          {`${textData.errorPrefix}${error}`}
        </p>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      {" "}
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6 text-primary-dark dark:text-primary-light text-center">
          {textData.title}
        </h2>

        {websites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((website) => {
              const status = translateStatus(website.website_status);

              return (
                <div
                  key={website.website_uuid}
                  className={`p-6 rounded-xl shadow-lg 
                bg-gradient-to-br from-primary-lightuser to-primary-lightuser 
                dark:from-secondary-darkuser dark:to-tertiary-darkuser
                text-primary-dark dark:text-primary-light`}
                >
                  {/* Header */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{website.domain_name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full font-semibold text-xs ${status.color}`}
                    >
                      {status.text}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 text-sm">
                    {/* Hosting Start Date */}
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-primary-brand" />
                      <p>
                        <strong>{textData.hostingStartDate}</strong>{" "}
                        {website.hosting_start_date
                          ? new Date(
                              website.hosting_start_date
                            ).toLocaleDateString("fa-IR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "نامشخص"}
                      </p>
                    </div>

                    {/* Hosting End Date */}
                    <div className="flex items-center gap-2">
                      <FaClock className="text-primary-brand" />
                      <p>
                        <strong>{textData.hostingEndDate}</strong>{" "}
                        {website.hosting_end_date
                          ? new Date(
                              website.hosting_end_date
                            ).toLocaleDateString("fa-IR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "نامشخص"}
                      </p>
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-1">
                      <p>
                        <FaInfoCircle className="inline text-primary-brand" />{" "}
                        <strong>{textData.customerName}</strong>{" "}
                        {website.customer_name}
                      </p>
                      <p>
                        <FaLink className="inline text-primary-brand" />{" "}
                        <strong>{textData.customerEmail}</strong>{" "}
                        {website.customer_email}
                      </p>
                      <p>
                        <FaGlobe className="inline text-primary-brand" />{" "}
                        <strong>{textData.customerPhone}</strong>{" "}
                        <span dir="ltr">{website.customer_phone}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-tertiary-dark dark:text-tertiary-light">
            {textData.noWebsites}
          </p>
        )}
      </div>
    </UserLayout>
  );
}
