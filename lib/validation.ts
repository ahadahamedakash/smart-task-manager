import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .nonempty("Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be at most 50 characters"),

  userName: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),

  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
});

export const loginSchema = z.object({
  userName: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),

  password: z
    .string()
    .nonempty("Password is required")
    .min(1, "Password is required"),
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

export const projectSchema = z.object({
  projectName: z.string().min(1, "Project name is required").max(100),
  description: z.string().max(500).optional(),
});
