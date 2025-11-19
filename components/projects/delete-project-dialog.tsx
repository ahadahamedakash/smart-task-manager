"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteProjectAction } from "@/app/(dashboard)/projects/action";

export function DeleteProjectDialog({
  children,
  projectId,
  projectName,
}: {
  children: React.ReactNode;
  projectId: string;
  projectName: string;
}) {
  const [open, setOpen] = useState(false);

  const [isLoading, startTransaction] = useTransition();

  async function handleDelete() {
    toast.info("Wait a moment!");

    startTransaction(async () => {
      try {
        const result = await deleteProjectAction(projectId);

        if (result.success) {
          toast.success(result.message || "Project deleted successfully");

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
          <AlertDialogTitle>Delete Project</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-bold">{projectName}</span>? This will also
            delete all tasks in this project. This action cannot be undone.
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
