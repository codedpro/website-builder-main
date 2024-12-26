import { Booking } from "@/types/Booking";
import { db } from "./db";
import { RowDataPacket, FieldPacket, PoolConnection } from "mysql2/promise";
import { UserBooking } from "@/types/UserBooking";
import { UserPermission, UserRole } from "@/types/UserRolePermissions";
import { Service } from "@/components/dashboard/adminbooking/AdminServices";
import { Resource } from "@/components/dashboard/adminbooking/AdminResources";
import { Schedule } from "@/components/dashboard/adminbooking/AdminSchedules";

export async function getAvailableBookings(): Promise<Booking[]> {
  let connection;

  try {
    connection = await db.getConnection();

    const [rows]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
      "CALL GetAvailableBookings(?)",
      ["123e4567-e89b-12d3-a456-426214174000"]
    );

    const bookings: Booking[] = rows[0] as Booking[];

    return bookings;
  } catch (error) {
    console.error("Error fetching available bookings:", error);
    throw new Error("Failed to fetch available bookings.");
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function getUserBookings(userId?: string): Promise<UserBooking[]> {
    let connection: PoolConnection | undefined;
  
    try {
      connection = await db.getConnection();
  
      let rows: RowDataPacket[][];
  
      if (userId) {
        const [result]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
          "CALL GetUserBookingsByWebsite(?, ?)",
          [userId, "123e4567-e89b-12d3-a456-426214174000"]
        );
        rows = result;
      } else {
        const [result]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
          "CALL GetAllBookingsByWebsite(?)",
          ["123e4567-e89b-12d3-a456-426214174000"]
        );
        rows = result;
      }
  
      // Cast rows[0] to UserBooking[] after extracting the first result set
      const bookings: UserBooking[] = rows[0] as UserBooking[];
  
      return bookings;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw new Error("Failed to fetch bookings.");
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
export async function getUserRolePermissions(
  userId: string,
  websiteId: string
): Promise<{ role: UserRole; permissions: UserPermission[] }> {
  let connection;

  try {
    connection = await db.getConnection();

    const [rows]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
      "CALL GetUserPermissions(?, ?)",
      [userId, websiteId]
    );

    const role: UserRole = rows[0][0] as UserRole;

    const permissions: UserPermission[] = rows[1] as UserPermission[];

    return { role, permissions };
  } catch (error) {
    console.error("Error fetching user role and permissions:", error);
    throw new Error("Failed to fetch user role and permissions.");
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function getServices(): Promise<Service[]> {
  let connection;

  try {
    connection = await db.getConnection();

    const [rows]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
      "CALL GetAvailableServices(?)",
      ["123e4567-e89b-12d3-a456-426214174000"]
    );

    const bookings: Service[] = rows[0] as Service[];

    return bookings;
  } catch (error) {
    console.error("Error fetching available bookings:", error);
    throw new Error("Failed to fetch available bookings.");
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function getResources(): Promise<Resource[]> {
  let connection;

  try {
    connection = await db.getConnection();

    const [rows]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
      "CALL GetAvailableResources(?)",
      ["123e4567-e89b-12d3-a456-426214174000"]
    );

    const bookings: Resource[] = rows[0] as Resource[];

    return bookings;
  } catch (error) {
    console.error("Error fetching available bookings:", error);
    throw new Error("Failed to fetch available bookings.");
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function getSchedules(): Promise<Schedule[]> {
  let connection;

  try {
    connection = await db.getConnection();

    const [rows]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
      "CALL GetResourceSchedules(?)",
      ["123e4567-e89b-12d3-a456-426214174000"]
    );

    const bookings: Schedule[] = rows[0] as Schedule[];

    return bookings;
  } catch (error) {
    console.error("Error fetching available bookings:", error);
    throw new Error("Failed to fetch available bookings.");
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function getTimeBlocks(): Promise<Schedule[]> {
  let connection;

  try {
    connection = await db.getConnection();

    const [rows]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
      "CALL GetTimeBlocks(?)",
      ["123e4567-e89b-12d3-a456-426214174000"]
    );

    const bookings: Schedule[] = rows[0] as Schedule[];

    return bookings;
  } catch (error) {
    console.error("Error fetching available bookings:", error);
    throw new Error("Failed to fetch available bookings.");
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
