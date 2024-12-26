import UserLayout from "@/components/Layout/UserLayout";
//import homeConfig from "@/lib/constants/homeConfig";
import AllBookingsList from "@/components/dashboard/history/AllBookingsLists";

export default function ReservationPage() {
 // const { main } = homeConfig;

  return (
    <UserLayout>
      <AllBookingsList />
    </UserLayout>
  );
}
