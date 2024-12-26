import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getUserBookings } from "@/lib/actions";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: JWT_SECRET });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = token;
    console.log("User ID from token:", id);

    // @ts-expect-error id type is string
    const results = await getUserBookings(id);

    console.log("Bookings data:", results);

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
