"use client";

import { UserBooking } from "@/types/UserBooking";
import { useEffect, useState } from "react";
import { BookingItem } from "./BookingItem"; // <-- import the child component

const textData = {
  loading: "در حال بارگذاری نوبت ها...",
  errorPrefix: "خطا: ",
  noBookings: "هیچ نوبتی موجود نیست.",
  title: "نوبت های شما",
};

// Main component
export default function AllBookingsList() {
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`/api/admin/getbookings`, {
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

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(
        `/api/admin/getbookings/updatebookingstatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingId, newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }

      // Refetch bookings to update the list
      await fetchBookings();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
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
            // Check if this booking is in the past
            const past = isPastBooking(booking.booking_date, booking.end_time);

            return (
              <BookingItem
                key={booking.booking_id}
                booking={booking}
                isPast={past}
                updateBookingStatus={updateBookingStatus}
              />
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
