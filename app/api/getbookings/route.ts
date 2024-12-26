import { NextResponse } from "next/server";
import { getAvailableBookings } from "@/lib/actions";

export async function GET() {
  try {
    const bookings = await getAvailableBookings();

    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
