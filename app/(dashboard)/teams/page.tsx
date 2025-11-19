import { Plus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { TeamCard } from "@/components/teams/team-card";
import { CreateTeamDialog } from "@/components/teams/create-team-dialog";
import { getTeamsAction } from "./actions";

export default async function TeamsPage() {
  const data = await getTeamsAction();

  const teams = data?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teams</h1>
          <p className="text-muted-foreground mt-1">
            Manage your teams and members
          </p>
        </div>
        <CreateTeamDialog>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Button>
        </CreateTeamDialog>
      </div>

      {teams && teams?.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams?.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No teams yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first team to get started with task management
            </p>
            <CreateTeamDialog>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Team
              </Button>
            </CreateTeamDialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
