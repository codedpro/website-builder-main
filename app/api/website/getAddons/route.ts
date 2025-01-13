import { NextResponse } from "next/server";
import { getWebsiteBuilderAddons } from "@/lib/actions";

export async function GET() {
  try {
    const addons = await getWebsiteBuilderAddons();
    console.log(addons)
    return NextResponse.json({ success: true, data: addons });
  } catch (error) {
    console.error("Error fetching bookings:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
