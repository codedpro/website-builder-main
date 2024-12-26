import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { db } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: JWT_SECRET });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: userId } = token;
    const body = await req.json();
    const {
      service_id,
      resource_id,
      date,
      start_time,
      time_block_id,
      add_ons,
    } = body;

    if (!service_id || !resource_id || !date || !start_time || !time_block_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const startDateTime = `${date} ${start_time}:00`;

    const [results] = await db.execute(`CALL CreateBooking(?, ?, ?, ?, ?, ?)`, [
      userId,
      resource_id,
      time_block_id,
      "pending",
      startDateTime,
      add_ons || null,
    ]);

    return NextResponse.json(
      { message: "Booking submitted successfully", results },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
