import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { db } from "@/lib/db";
import { getUserRolePermissions } from "@/lib/actions";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: JWT_SECRET });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = token;

    const { permissions } = await getUserRolePermissions(
        // @ts-expect-error id type is string
      id,
      "123e4567-e89b-12d3-a456-426214174000"
    );

    const hasPermission = permissions.some(
      (permission) =>
        permission.permission_name === "super_admin" ||
        permission.permission_name === "write_reservations"
    );

    if (!hasPermission) {
      return NextResponse.json(
        { error: "Forbidden: You do not have access to update bookings." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { bookingId, newStatus } = body;

    if (!bookingId || !newStatus) {
      return NextResponse.json(
        { error: "Invalid input. 'bookingId' and 'newStatus' are required." },
        { status: 400 }
      );
    }

    let connection;
    try {
      connection = await db.getConnection();

      await connection.query("CALL UpdateBookingStatus(?, ?)", [
        bookingId,
        newStatus,
      ]);

      return NextResponse.json(
        { message: "Booking status updated successfully." },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
      return NextResponse.json(
        { error: "Failed to update booking status." },
        { status: 500 }
      );
    } finally {
      if (connection) {
        connection.release();
      }
    }
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
