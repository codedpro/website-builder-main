import { NextResponse } from "next/server";
import { registerUser } from "@/lib/auth/authService";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { firstName, lastName, email, phone, password } = body;

    if (!firstName || !lastName || !email || !phone || !password) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const newUser = await registerUser(
      firstName,
      lastName,
      email,
      phone,
      password
    );

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
