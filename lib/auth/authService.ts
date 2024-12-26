import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { v4 as uuidv4 } from "uuid";

export async function authenticateUser(email: string, password: string) {
  const [rows] = await db.query<RowDataPacket[]>(`CALL GetUserByEmail(?)`, [
    email,
  ]);

  const user = rows[0][0];
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  return {
    id: user.uuid,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone_number: user.phone_number,
  };
}

export async function registerUser(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string
) {
  try {
    const [existingUsers] = await db.query<RowDataPacket[]>(
      `CALL GetUserByEmailOrPhone(?, ?)`,
      [email, phone]
    );

    if (existingUsers.length > 0) {
      if (existingUsers[0].email === email) {
        throw new Error("Email is already registered");
      }
      if (existingUsers[0].phone_number === phone) {
        throw new Error("Phone number is already registered");
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userUuid = uuidv4();

    await db.query(`CALL InsertUser(?, ?, ?, ?, ?, ?)`, [
      userUuid,
      firstName,
      lastName,
      email,
      phone,
      hashedPassword,
    ]);

    const [newUser] = await db.query<RowDataPacket[]>(
      `CALL GetUserByEmail(?)`,
      [email]
    );


    return {
      id: newUser[0].id,
      email: newUser[0].email,
      first_name: newUser[0].first_name,
      last_name: newUser[0].last_name,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in registerUser:", error.message);
      throw error;
    }

    console.error("Unexpected error in registerUser:", error);
    throw new Error("An unexpected error occurred during registration.");
  }
}
