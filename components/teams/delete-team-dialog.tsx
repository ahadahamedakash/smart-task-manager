"use client";

import { toast } from "sonner";
import { useState, useTransition } from "react";

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { deleteTeamAction } from "@/app/(dashboard)/teams/actions";

export function DeleteTeamDialog({
  teamId,
  children,
  teamName,
}: {
  children: React.ReactNode;
  teamId: string;
  teamName: string;
}) {
  const [open, setOpen] = useState(false);

  const [isLoading, startTransaction] = useTransition();

  async function handleDelete() {
    toast.info("Wait a moment!");

    startTransaction(async () => {
      try {
        const result = await deleteTeamAction(teamId);

        if (result.success) {
          toast.success(result.message || "Team deleted successfully");

          setOpen(false);
        } else {
          toast.error(result.message || "An error occured, please try again!");
        }
      } catch (error) {
        console.log("ERROR: ", error);
      }
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Team</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-bold">{teamName}</span>? This will also delete
            all members, projects, and tasks associated with this team. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
