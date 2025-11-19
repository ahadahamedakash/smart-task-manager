"use client";

import { toast } from "sonner";
import { useState, useTransition } from "react";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Team } from "@/lib/types";
import { updateTeamAction } from "@/app/(dashboard)/teams/actions";

export function EditTeamDialog({
  children,
  team,
}: {
  children: React.ReactNode;
  team: Team;
}) {
  const [open, setOpen] = useState(false);

  const [isLoading, startTransaction] = useTransition();

  async function handleSubmit(formData: FormData) {
    toast.info("Wait a moment!");

    startTransaction(async () => {
      try {
        const result = await updateTeamAction(team._id, formData);

        if (result.success) {
          toast.success(result.message || "Team updated successfully");

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Team</DialogTitle>
          <DialogDescription>Update team information</DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name</Label>
            <Input
              id="teamName"
              name="teamName"
              defaultValue={team.teamName}
              required
              maxLength={100}
            />

            <Label htmlFor="description">Team Description</Label>
            <Input
              id="description"
              name="description"
              defaultValue={team.description}
              required
              maxLength={150}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
