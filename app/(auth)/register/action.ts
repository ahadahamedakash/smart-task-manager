"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import dbConnect from "@/lib/db";
import User from "@/lib/models/user-model";

import { registerSchema } from "@/lib/validation";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function registerUser(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const userName = formData.get("userName") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match",
      error: "password_mismatch",
    };
  }

  const validation = registerSchema.safeParse({ fullName, userName, password });

  if (!validation.success) {
    return { error: validation.error };
  }

  await dbConnect();

  const existingUserName = await User.findOne({ userName });

  if (existingUserName) {
    return {
      success: false,
      message: "User name already exist",
      error: "username_exists",
    };
  }

  const user = await User.create({
    fullName,
    userName,
    password,
  });

  // GENERATE TOKEN
  const token = jwt.sign(
    {
      userId: user._id.toString(),
      userName: user.userName,
      fullName: user.fullName,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    success: true,
    message: "Account created successfully",
  };
}
