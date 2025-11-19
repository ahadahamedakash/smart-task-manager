import Link from "next/link";
import { Trash2, CheckSquare } from "lucide-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { DeleteProjectDialog } from "./delete-project-dialog";

type ProjectWithTeamAndCount = {
  _id: string;
  projectName: string;
  description: string;
  teamId: { teamName: string; details: string } | null;
  createdBy?: string;
  taskCount?: number;
};

export function ProjectCard({ project }: { project: ProjectWithTeamAndCount }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{project.projectName}</CardTitle>
            <CardDescription className="mt-1">
              {project.teamId?.teamName || "Unknown Team"}
            </CardDescription>
          </div>
          <div className="flex gap-1">
            <DeleteProjectDialog
              projectId={project._id}
              projectName={project.projectName}
            >
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </DeleteProjectDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {project?.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project?.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="gap-1">
            <CheckSquare className="h-3 w-3" />
            {project?.taskCount} {project?.taskCount === 1 ? "Task" : "Tasks"}
          </Badge>
          <Link href={`/tasks?project=${project?._id}`}>
            <Button variant="outline" size="sm">
              View Tasks
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
