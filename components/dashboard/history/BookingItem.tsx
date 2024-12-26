"use client";

import { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaMoneyBillWave,
  FaHistory,
} from "react-icons/fa";
import { UserBooking } from "@/types/UserBooking";

const textData = {
  resource: "سرویس:",
  date: "تاریخ:",
  time: "زمان:",
  status: "وضعیت:",
  totalAmount: "مبلغ کل:",
  historyLabel: "تاریخچه - پایان یافته",
  saveButton: "ذخیره",
};

const translateStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return {
        text: "در انتظار تایید",
        color:
          "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200",
      };
    case "canceled":
      return {
        text: "لغو شده",
        color: "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200",
      };
    case "confirmed":
      return {
        text: "تأیید شده",
        color:
          "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200",
      };
    default:
      return {
        text: "نامشخص",
        color: "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      };
  }
};

interface BookingItemProps {
  booking: UserBooking;
  isPast: boolean;
  updateBookingStatus: (bookingId: string, newStatus: string) => Promise<void>;
}

export function BookingItem({
  booking,
  isPast,
  updateBookingStatus,
}: BookingItemProps) {
  const [selectedStatus, setSelectedStatus] = useState(booking.status);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // If booking status changes after a refetch, keep local state in sync
  useEffect(() => {
    setSelectedStatus(booking.status);
  }, [booking.status]);

  // All possible status options
  const statusOptions = ["pending", "confirmed", "canceled"];

  // The style/text for the currently selected status (shown on the pill)
  const currentStatus = translateStatus(selectedStatus);

  // Toggle the dropdown
  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // When user picks a new status from the dropdown
  const handleStatusChange = (newStatus: string) => {
    setSelectedStatus(newStatus);
    setIsDropdownOpen(false);
  };

  // Save the new status to the server
  const handleSave = async () => {
    await updateBookingStatus(booking.booking_id, selectedStatus);
  };

  return (
    <li
      className={`relative p-6 rounded-xl shadow-lg 
        bg-gradient-to-br from-primary-lightuser to-primary-lightuser 
        dark:from-secondary-darkuser dark:to-tertiary-darkuser
        ${isPast ? "opacity-70" : "opacity-100"} 
        text-primary-dark dark:text-primary-light
        border-2 border-transparent
      `}
    >
      {/* Title and "Past" Indicator */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">{booking.service_name}</h3>
        {isPast && (
          <span
            className="flex items-center gap-1 text-xs px-3 py-1 
            bg-red-200 text-red-600 font-semibold rounded-full dark:bg-red-800 dark:text-red-300"
          >
            <FaHistory />
            {textData.historyLabel}
          </span>
        )}
      </div>

      {/* Card Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        {/* Resource */}
        <div className="flex items-center gap-2">
          <FaUser className="text-primary-brand" />
          <p>
            <strong className="ml-1">{textData.resource}</strong>
            {booking.resource_name}
          </p>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-primary-brand" />
          <p>
            <strong className="ml-1">{textData.date}</strong>
            {new Date(booking.booking_date).toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Time */}
        <div className="flex items-center gap-2">
          <FaClock className="text-primary-brand" />
          <p>
            <strong className="ml-1">{textData.time}</strong>
            {booking.start_time} - {booking.end_time}
          </p>
        </div>

        {/* Status Label & Dropdown */}
        {/* Changed <p> to <div> to avoid putting <div> inside <p> */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <strong className="ml-1">{textData.status}</strong>
            {/* Clickable pill (shows current status) */}
            <div className="relative inline-block">
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold cursor-pointer ${currentStatus.color}`}
                onClick={handleToggleDropdown}
              >
                {currentStatus.text}
              </span>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div
                  className="absolute z-10 mt-2 w-36 bg-transparent rounded-full"
                >
                  <ul className="py-1">
                    {statusOptions.map((option) => {
                      const statusData = translateStatus(option);
                      return (
                        <li
                          key={option}
                          onClick={() => handleStatusChange(option)}
                          className={`cursor-pointer px-3 py-1 text-sm flex items-center gap-2 
                                      hover:opacity-90 transition-opacity
                                      ${statusData.color}
                                     `}
                        >
                          {statusData.text}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Show Save button only if the user changed the status */}
          {selectedStatus !== booking.status && (
            <button
              onClick={handleSave}
              className="mt-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-fit"
            >
              {textData.saveButton}
            </button>
          )}
        </div>

        {/* Total Amount */}
        <div className="flex items-center gap-2 sm:col-span-2">
          <FaMoneyBillWave className="text-primary-brand" />
          <p>
            <strong className="ml-1">{textData.totalAmount}</strong>
            {booking.total_amount}
          </p>
        </div>
      </div>
    </li>
  );
}
