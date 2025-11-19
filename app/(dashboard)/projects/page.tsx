import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FolderKanban } from "lucide-react";
import { CreateProjectDialog } from "@/components/projects/create-project-dialog";
import { getTeamsAction } from "../teams/actions";
import { ProjectCard } from "@/components/projects/project-card";
import { getProjectsAction } from "./action";
import { TProject, TTeam } from "@/lib/types";

export default async function ProjectsPage() {
  const teamData = await getTeamsAction();

  const teams: TTeam[] = (teamData?.data as TTeam[]) || [];

  const teamIds = teams?.map((t) => t._id) || [];

  const data = await getProjectsAction();

  const projectss: TProject[] = (data?.data as TProject[]) || [];

  //   if (teamIds.length > 0) {
  //     const { data } = await supabase
  //       .from("projects")
  //       .select("*, teams(name)")
  //       .in("teamId", teamIds)
  //       .order("createdAt", { ascending: false });
  //     projects = data || [];
  //   }

  //   const projectsWithTaskCount = await Promise.all(
  //     projects.map(async (project) => {
  //       const { count } = await supabase
  //         .from("tasks")
  //         .select("*", { count: "exact", head: true })
  //         .eq("projectId", project._id);

  //       return {
  //         ...project,
  //         task_count: count || 0,
  //       };
  //     })
  //   );

  //   const { data: teamsData } = await supabase
  //     .from("teams")
  //     .select("*")
  //     .eq("createdBy", session.userId);

  const projectsWithTaskCount = [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your projects and tasks
          </p>
        </div>
        {/* <CreateProjectDialog teams={teams || []}>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        </CreateProjectDialog> */}
      </div>
      {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projectss?.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div> */}

      {/* {projectsWithTaskCount?.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectsWithTaskCount?.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderKanban className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first project to start managing tasks
            </p>
            <CreateProjectDialog teams={teams || []}>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            </CreateProjectDialog>
          </CardContent>
        </Card>
      )} */}
    </div>
  );
}
