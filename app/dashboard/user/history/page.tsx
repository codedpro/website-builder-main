import UserLayout from "@/components/Layout/UserLayout";
//import homeConfig from "@/lib/constants/homeConfig";
import BookingsList from "@/components/dashboard/history/BookingsList";

export default function ReservationPage() {
  //const { main } = homeConfig;

  return (
    <UserLayout>
      <BookingsList />
    </UserLayout>
  );
}
