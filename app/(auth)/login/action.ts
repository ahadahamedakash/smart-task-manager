"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import dbConnect from "@/lib/db";
import User from "@/lib/models/user-model";
import { loginSchema } from "@/lib/validation";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface LoginResult {
  success: boolean;
  message: string;
  error?: string;
}

export async function loginAction(formData: FormData): Promise<LoginResult> {
  try {
    const userName = formData.get("userName") as string;
    const password = formData.get("password") as string;

    // Validate input
    if (!userName || !password) {
      return {
        success: false,
        message: "User name and password are required",
        error: "missing_fields",
      };
    }

    const validation = loginSchema.safeParse({ userName, password });

    if (!validation.success) {
      return {
        success: false,
        message: "Validation error",
        // error: validation.error,
      };
    }

    await dbConnect();

    const user = await User.findOne({ userName });
    if (!user) {
      return {
        success: false,
        message: "Invalid user name or password",
        error: "invalid_credentials",
      };
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password",
        error: "invalid_credentials",
      };
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      JWT_SECRET as string,
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
      message: "Login successful",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.message || "An error occurred during login",
      error: "server_error",
    };
  }
}
