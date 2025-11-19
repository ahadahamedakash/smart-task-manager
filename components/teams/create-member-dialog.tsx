"use client";

import { toast } from "sonner";
import { useState, useTransition } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { createMemberAction } from "@/app/(dashboard)/teams/actions";

export function CreateMemberDialog({
  children,
  teamId,
}: {
  children: React.ReactNode;
  teamId: string;
}) {
  const [open, setOpen] = useState(false);

  const [capacity, setCapacity] = useState("1");

  const [isLoading, startTransaction] = useTransition();

  async function handleSubmit(formData: FormData) {
    toast.info("Wait a moment!");

    startTransaction(async () => {
      try {
        formData.append("teamId", teamId);
        formData.append("capacity", capacity);

        const result = await createMemberAction(formData);

        if (result.success) {
          toast.success("Member added successfully");

          setOpen(false);
          setCapacity("1");
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
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>Add a new member to your team</DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              required
              maxLength={50}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              name="role"
              placeholder="Developer"
              required
              maxLength={50}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity (1-5)</Label>
            <Select value={capacity} onValueChange={setCapacity}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              {isLoading ? "Adding..." : "Add Member"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
