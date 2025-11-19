"use client";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { logoutAction } from "@/lib/action";
import { redirect } from "next/navigation";

const LogoutButton = () => {
  async function handleLogout() {
    toast.info("Wait a moment!");
    await logoutAction();

    toast.success("Logged out successfully!");
    redirect("/login");
  }

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
