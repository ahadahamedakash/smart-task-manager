"use client";

import { toast } from "sonner";
import { TTeam } from "@/lib/types";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createProjectAction } from "@/app/(dashboard)/projects/action";

export function CreateProjectDialog({
  children,
  teams,
}: {
  children: React.ReactNode;
  teams: TTeam[];
}) {
  const [open, setOpen] = useState(false);

  const [teamId, setTeamId] = useState("");

  const [isLoading, startTransaction] = useTransition();

  async function handleSubmit(formData: FormData) {
    toast.info("Wait a moment!");

    startTransaction(async () => {
      try {
        if (!teamId) {
          toast.error("Please select a team");
          return;
        }

        formData.append("teamId", teamId);

        const result = await createProjectAction(formData);

        if (result.success) {
          toast.success(result.message || "Project created successfully");

          setOpen(false);
          setTeamId("");
        } else {
          toast.error(result.message || "An error occured, please try again!");
        }
      } catch (error) {
        console.log("ERROR: ", error);
      }
    });
  }

  if (teams.length === 0) {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>No Teams Available</DialogTitle>
            <DialogDescription>
              You need to create a team first before creating a project.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new project to organize your tasks
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="team">Team</Label>
            <Select value={teamId} onValueChange={setTeamId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                {teams?.map((team) => (
                  <SelectItem key={team._id} value={team._id}>
                    {team.teamName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              name="projectName"
              placeholder="Website Redesign"
              required
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your project..."
              rows={3}
              maxLength={500}
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
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
