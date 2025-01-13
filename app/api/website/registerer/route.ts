import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getWebsitesByRegisterer } from "@/lib/website";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: JWT_SECRET });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: registererId } = token; // Use the registerer ID from the JWT token

    if (!registererId) {
      return NextResponse.json({ error: "Invalid registerer ID" }, { status: 400 });
    }

    if (typeof registererId !== "string") {
        throw new Error("Invalid registererId");
      }
    const websites = await getWebsitesByRegisterer(registererId);
    console.log(websites)
    return NextResponse.json({ data: websites }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error in GET /api/website/registerer:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Internal server error" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
