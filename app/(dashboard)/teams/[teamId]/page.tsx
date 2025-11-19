import Link from "next/link";
import { Plus, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CreateMemberDialog } from "@/components/teams/create-member-dialog";

export default async function TeamMembersPage({
  params,
}: {
  params: { teamId: string };
}) {
  const { teamId } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/teams">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          {/* <h1 className="text-3xl font-bold">{team.name}</h1> */}
          <p className="text-muted-foreground mt-1">Manage team members</p>
        </div>
        <CreateMemberDialog teamId={teamId}>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </CreateMemberDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <MembersTable members={membersWithTaskCount} /> */}
        </CardContent>
      </Card>
    </div>
  );
}
