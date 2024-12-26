import UserLayout from "@/components/Layout/UserLayout";
import BookingSelection from "@/components/dashboard/booking/BookingSelection";
import { getAvailableBookings } from "@/lib/actions";
import homeConfig from "@/lib/constants/homeConfig";
import { Booking } from "@/types/Booking";

export default async function ReservationPage() {
  let bookings: { available_bookings: Booking[] }[] = [];

  try {
    const availableBookings = await getAvailableBookings();
    bookings = [{ available_bookings: availableBookings }];
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
  }
  const { main } = homeConfig;

  return (
    <UserLayout>
      <BookingSelection bookings={bookings} isRtl={main.isRtl} />
    </UserLayout>
  );
}
