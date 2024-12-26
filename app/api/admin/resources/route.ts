import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getResources, getUserRolePermissions } from "@/lib/actions";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: JWT_SECRET });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = token;

    const { role, permissions } = await getUserRolePermissions(
      // @ts-expect-error id type is string
      id,
      "123e4567-e89b-12d3-a456-426214174000"
    );

    const hasPermission = permissions.some(
      (permission) =>
        permission.permission_name === "super_admin" ||
        permission.permission_name === "read_reservations"
    );

    if (!hasPermission) {
      return NextResponse.json(
        { error: "Forbidden: You do not have access to this resource" },
        { status: 403 }
      );
    }
    const results = await getResources();
    return NextResponse.json({ results, role, permissions }, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
