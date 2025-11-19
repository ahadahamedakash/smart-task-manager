import Link from "next/link";
import { Users, Edit2, Trash2 } from "lucide-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Team } from "@/lib/types";
import { EditTeamDialog } from "./edit-team-dialog";
import { DeleteTeamDialog } from "./delete-team-dialog";

export function TeamCard({ team }: { team: Team }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{team.teamName}</CardTitle>
          <CardDescription>{team.description}</CardDescription>

          <div className="flex gap-1">
            <EditTeamDialog team={team}>
              <Button variant="ghost" size="icon">
                <Edit2 className="h-4 w-4" />
              </Button>
            </EditTeamDialog>

            <DeleteTeamDialog teamId={team._id} teamName={team.teamName}>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </DeleteTeamDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Link href={`/teams/${team._id}`}>
          <Button variant="outline" className="w-full">
            <Users className="h-4 w-4 mr-2" />
            View Members
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
