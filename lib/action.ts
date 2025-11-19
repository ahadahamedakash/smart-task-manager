"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type TokenPayload = {
  userId: string;
  userName: string;
  fullName: string;
};

const JWT_SECRET = process.env.JWT_SECRET as string;

// LOGOUT ACTION
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  redirect("/login");
}

// GET SESSION
export async function getSession(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  return await verifyToken(token);
}

// VERIFY TOKEN
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const payload = await jwt.verify(token, JWT_SECRET);

    return payload as TokenPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
