"use client";

import { UserBooking } from "@/types/UserBooking";
import { useEffect, useState } from "react";

import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaMoneyBillWave,
  FaHistory,
} from "react-icons/fa";

const textData = {
  loading: "در حال بارگذاری نوبت ها...",
  errorPrefix: "خطا: ",
  noBookings: "هیچ نوبتی موجود نیست.",
  title: "نوبت های شما",
  resource: "سرویس:",
  date: "تاریخ:",
  time: "زمان:",
  status: "وضعیت:",
  totalAmount: "مبلغ کل:",
  historyLabel: "تاریخچه - پایان یافته",
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

export default function BookingsList() {
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/user/getbookings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch bookings: ${response.statusText}`);
        }

        const data = await response.json();
        setBookings(
          data.results.sort(
            (a: UserBooking, b: UserBooking) =>
              new Date(a.booking_date).getTime() -
                new Date(b.booking_date).getTime() ||
              a.start_time.localeCompare(b.start_time)
          )
        );
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

    fetchBookings();
  }, []);

  const isPastBooking = (date: Date | string, time: string): boolean => {
    const bookingDateTime = new Date(
      (date instanceof Date ? date.toISOString().split("T")[0] : date) +
        `T${time}`
    );
    return bookingDateTime.getTime() < new Date().getTime();
  };

  if (loading) {
    return (
      <p className="text-center text-primary-dark dark:text-primary-light">
        {textData.loading}
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        {`${textData.errorPrefix}${error}`}
      </p>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-primary-dark dark:text-primary-light text-center">
        {textData.title}
      </h2>

      {bookings.length > 0 ? (
        <ul className="space-y-4">
          {bookings.map((booking) => {
            const past = isPastBooking(booking.booking_date, booking.end_time);
            return (
              <li
                key={booking.booking_id}
                className={`relative p-6 rounded-xl shadow-lg 
                  bg-gradient-to-br from-primary-lightuser to-primary-lightuser 
                  dark:from-secondary-darkuser dark:to-tertiary-darkuser
                  ${past ? "opacity-70" : "opacity-100"} 
                  text-primary-dark dark:text-primary-light
                  border-2 border-transparent 
                `}
              >
                {/* Service Name and Past Booking Indicator */}
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold">{booking.service_name}</h3>

                  {/* Show 'History Label' if booking is in the past */}
                  {past && (
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
                      {new Date(booking.booking_date).toLocaleDateString(
                        "fa-IR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
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

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <FaHistory
                      className={`${
                        past
                          ? "text-red-600 dark:text-red-300"
                          : "text-primary-brand"
                      }`}
                    />
                    <p className="flex items-center gap-1">
                      <strong className="ml-1">{textData.status}</strong>
                      {past ? (
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200`}
                        >
                          {textData.historyLabel}
                        </span>
                      ) : (
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            translateStatus(booking.status).color
                          }`}
                        >
                          {translateStatus(booking.status).text}
                        </span>
                      )}
                    </p>
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
          })}
        </ul>
      ) : (
        <p className="text-center text-tertiary-dark dark:text-tertiary-light">
          {textData.noBookings}
        </p>
      )}
    </>
  );
}
