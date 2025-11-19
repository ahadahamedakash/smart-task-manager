import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  userName: z.string().min(3, "Username must be at least 3 characters").max(20),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  userName: z.string().min(3, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const teamSchema = z.object({
  teamName: z
    .string()
    .nonempty("Team name is required")
    .min(3, "Team name must be at least 3 characters")
    .max(50, "Team name must be at most 50 characters"),
  description: z
    .string()
    .nonempty("Team description is required")
    .min(5, "Team description must be at least 5 characters")
    .max(150, "Team description must be at most 150 characters"),
});
