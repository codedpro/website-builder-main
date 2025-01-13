import { db } from "./db"; // Database connection
import { RowDataPacket, FieldPacket, PoolConnection } from "mysql2/promise";

export async function handleOrderCreation(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  userId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  let connection: PoolConnection | undefined;

  try {
    connection = await db.getConnection();

    console.log("Received Data:", data);

    const {
      customerInfo: {
        fullName,
        email,
        phoneNumber,
        marketingEmails,
        acceptRules,
      },
      domainName,
      selectedAddOns,
      totalPriceWithDiscount,
      totalPriceWithoutDiscount,
    } = data;

    console.log("Step 1: Validating Data");

    if (!fullName || !email || !phoneNumber) {
      throw new Error("Customer information is incomplete.");
    }

    console.log("Step 2: Placing Order");

    //const [orderResult]: [RowDataPacket[], FieldPacket[]] =
    await connection.query(
      "CALL sp_create_website_order(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @order_id)",
      [
        fullName,
        email,
        phoneNumber,
        marketingEmails ? 1 : 0,
        acceptRules ? 1 : 0,
        domainName,
        userId,
        JSON.stringify(selectedAddOns),
        totalPriceWithoutDiscount,
        totalPriceWithDiscount,
      ]
    );

    const [[orderIdResult]]: [RowDataPacket[], FieldPacket[]] =
      await connection.query("SELECT @order_id AS orderId");
    const orderId = orderIdResult.orderId;

    if (!orderId) {
      throw new Error("Failed to create order.");
    }

    console.log("Step 3: Order Created. Order ID:", orderId);

    console.log("Step 4: Paying for Order");

    try {
      await connection.query("CALL sp_pay_order_with_wallet(?, ?)", [
        orderId,
        userId,
      ]);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("Insufficient wallet balance")
      ) {
        throw new Error("موجودی کیف پول شما کافی نیست.");
      }
      throw error;
    }

    console.log("Step 5: Payment Successful");

    console.log("Step 6: Activating Website");

    await connection.query("CALL sp_activate_website(?, @website_uuid)", [
      orderId,
    ]);

    const [[websiteResult]]: [RowDataPacket[], FieldPacket[]] =
      await connection.query("SELECT @website_uuid AS websiteUuid");

    const websiteUuid = websiteResult?.websiteUuid;

    if (!websiteUuid) {
      throw new Error("Failed to activate website.");
    }

    console.log("Step 7: Website Activated. Website UUID:", websiteUuid);

    return {
      status: 200,
      message: "Website successfully activated.",
      data: {
        orderId,
        websiteUuid,
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in handleOrderCreation:", error.message);
      return {
        status: 500,
        error:
          error.message || "Internal server error. Please try again later.",
      };
    }
    console.error("Unknown error in handleOrderCreation:", error);
    return {
      status: 500,
      error: "An unexpected error occurred.",
    };
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
