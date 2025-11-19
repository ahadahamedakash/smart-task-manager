import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Link from "next/link";
import { Team } from "@/lib/types";

export function TeamCard({ team }: { team: Team }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{team.teamName}</CardTitle>
          <CardDescription>{team.description}</CardDescription>
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
