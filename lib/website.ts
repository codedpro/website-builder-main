import { db } from "./db"; // Database connection
import { RowDataPacket, FieldPacket, PoolConnection } from "mysql2/promise";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getWebsitesByRegisterer(registererId: string): Promise<any[]> {
  let connection: PoolConnection | undefined;

  try {
    connection = await db.getConnection();

    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query(
      "CALL sp_get_websites_by_registerer(?)",
      [registererId]
    );


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rows[0] as any[];
  } catch (error) {
    console.error("Error fetching websites by registerer:", error);
    throw new Error("Failed to fetch websites. Please try again later.");
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
