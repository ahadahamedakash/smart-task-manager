import Link from "next/link";
import { Plus, CheckSquare, LayoutGrid } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function TasksPage({
  searchParams,
}: {
  searchParams: { project?: string; member?: string; status?: string };
}) {
  //   const { data: teams } = await supabase
  //     .from('teams')
  //     .select('id')
  //     .eq('created_by', session.userId);

  //   const teamIds = teams?.map((t) => t.id) || [];

  //   let query = supabase
  //     .from('tasks')
  //     .select('*, projects!inner(id, name, team_id), members(id, name)')
  //     .in('projects.team_id', teamIds)
  //     .order('created_at', { ascending: false });

  //   if (searchParams.project) {
  //     query = query.eq('project_id', searchParams.project);
  //   }

  //   if (searchParams.member) {
  //     query = query.eq('assigned_member_id', searchParams.member);
  //   }

  //   if (searchParams.status) {
  //     query = query.eq('status', searchParams.status);
  //   }

  //   const { data: tasks } = await query;

  //   const { data: projects } = await supabase
  //     .from('projects')
  //     .select('*')
  //     .in('team_id', teamIds);

  //   const { data: allMembers } = await supabase
  //     .from('members')
  //     .select('*')
  //     .in('team_id', teamIds);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your tasks
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/tasks/board">
            <Button variant="outline">
              <LayoutGrid className="h-4 w-4 mr-2" />
              Kanban Board
            </Button>
          </Link>
          {/* <CreateTaskDialog
            projects={projects || []}
            members={allMembers || []}
          >
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </CreateTaskDialog> */}
        </div>
      </div>

      {/* <TaskFilters
        projects={projects || []}
        members={allMembers || []}
        currentProject={searchParams.project}
        currentMember={searchParams.member}
        currentStatus={searchParams.status}
      /> */}

      {/* {tasks && tasks.length > 0 ? (
        <TasksList tasks={tasks} members={allMembers || []} />
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchParams.project || searchParams.member || searchParams.status
                ? 'No tasks match your filters'
                : 'Create your first task to get started'}
            </p>
            <CreateTaskDialog projects={projects || []} members={allMembers || []}>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            </CreateTaskDialog>
          </CardContent>
        </Card>
      )} */}
    </div>
  );
}
