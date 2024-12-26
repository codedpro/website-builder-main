import AdminBookingManager from "@/components/dashboard/adminbooking/AdminBookingManager";
import UserLayout from "@/components/Layout/UserLayout";
//import homeConfig from "@/lib/constants/homeConfig";

export default async function ReservationPage() {
//  const { main } = homeConfig;

  return (
    <UserLayout>
      <AdminBookingManager />
    </UserLayout>
  );
}
