"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useState, useTransition } from "react";

import { registerUser } from "./action";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RegisterPage = () => {
  const router = useRouter();

  const [error, setError] = useState<string>("");

  const [isLoading, startTransaction] = useTransition();

  async function handleSubmit(formData: FormData) {
    toast.info("Wait a moment!");

    startTransaction(async () => {
      try {
        const result = await registerUser(formData);

        if (result.success) {
          toast.success(result.message || "Registered successfully!");

          router.push("/");

          router.refresh();
        }

        if (!result.success) {
          setError(result.message || "Failed to register. Please try again!");

          toast.error(result.message || "An error occured. Please try again!");
        }
      } catch (error) {
        console.log("ERROR: ", error);
      }
    });
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <CheckCircle2 className="h-8 w-8 text-slate-700 dark:text-slate-300" />
          <CardTitle className="text-2xl font-bold">
            Smart Task Manager
          </CardTitle>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive mb-3">
              {error}
            </div>
          )}

          <form action={handleSubmit} className="space-y-4">
            <Label htmlFor="fullName">Your name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              required
              minLength={2}
              maxLength={20}
            />

            <Label htmlFor="userName">User name</Label>
            <Input
              id="userName"
              name="userName"
              type="text"
              placeholder="Enter user name"
              required
              minLength={2}
              maxLength={20}
            />

            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              minLength={6}
              maxLength={20}
            />

            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Retype your password"
              required
              minLength={6}
              maxLength={20}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              Register
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link className="text-muted-foreground underline" href="/login">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
