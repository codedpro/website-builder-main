import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { handleOrderCreation } from "@/lib/order";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: JWT_SECRET });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: userId } = token;
    const data = await req.json();

    console.log("Pure Data : ", data);

    // Map selected add-ons with default quantity
    const addonsWithDefaultQuantity = data.selectedAddOns.map(
      (addon: number) => ({
        addon_id: addon,
        quantity: 1,
      })
    );

    // Prepare the updated payload
    const updatedData = {
      ...data,
      selectedAddOns: addonsWithDefaultQuantity,
    };

    console.log("Updated Data:", updatedData);

    if (typeof userId !== "string") {
      throw new Error("Invalid userId");
    }

    const response = await handleOrderCreation(updatedData, userId);

    if (response.status !== 200) {
      return NextResponse.json(
        { message: response.error || "Failed to process order" },
        { status: response.status }
      );
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.error("Error in POST handler:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message || "Internal server error" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
