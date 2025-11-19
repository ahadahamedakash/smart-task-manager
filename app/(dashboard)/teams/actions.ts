/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";

import dbConnect from "@/lib/db";
import Team from "@/lib/models/team-model";
import Member from "@/lib/models/member-schema";

import { getSession } from "@/lib/action";
import { memberSchema, teamSchema } from "@/lib/validation";

export interface TeamResult {
  success: boolean;
  message: string;
  error?: string;
  data?: object;
}

export async function createTeamAction(
  formData: FormData
): Promise<TeamResult> {
  const session = await getSession();

  if (!session)
    return {
      success: false,
      message: "You are unauthorized to perform this action",
      error: "Unauthorized",
    };

  const teamName = formData.get("teamName") as string;
  const description = formData.get("description") as string;

  const validation = teamSchema.safeParse({ teamName, description });

  // console.log("Zod Issues:", validation?.error?.issues);

  if (!validation.success) {
    const formattedErrors = validation.error.flatten().fieldErrors;

    console.log("formattedErrors: ", formattedErrors);

    return {
      success: false,
      message: "Validation error",
      // error: formattedErrors,
    };
  }

  await dbConnect();

  const TeamData = await Team.create({
    teamName,
    description,
    createdBy: session.userId,
  });

  revalidatePath("/teams");
  return {
    success: true,
    message: "Team created successfully",
    data: TeamData,
  };
}

export async function getTeamsAction(): Promise<TeamResult> {
  try {
    const session = await getSession();

    if (!session)
      return {
        success: false,
        message: "You are unauthorized to perform this action",
        error: "Unauthorized",
      };

    await dbConnect();

    const TeamData = await Team.find({
      createdBy: session.userId,
    }).lean();

    return {
      success: true,
      message: "Team retrived successfully",
      data: TeamData,
    };
  } catch (e: unknown) {
    return { success: false, message: "An error occured!", error: e as string };
  }
}

export async function updateTeamAction(
  teamId: string,
  formData: FormData
): Promise<TeamResult> {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "You are unauthorized to perform this action",
        error: "Unauthorized",
      };
    }

    const teamName = formData.get("teamName") as string;
    const description = formData.get("description") as string;

    const validation = teamSchema.safeParse({ teamName, description });

    if (!validation.success) {
      // const formattedErrors = validation.error.flatten().fieldErrors;

      return {
        success: false,
        message: "Validation error",
        // error: formattedErrors,
      };
    }

    await dbConnect();

    const team = await Team.findOne({
      _id: teamId,
      createdBy: session.userId,
    });

    if (!team) {
      return {
        success: false,
        message: "Team not found",
        error: "Not Found",
      };
    }

    // Update the team
    team.teamName = teamName;
    team.description = description;
    await team.save();

    revalidatePath("/teams");

    return {
      success: true,
      message: "Team updated successfully",
      data: team,
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to update team",
      error: error.message,
    };
  }
}

export async function deleteTeamAction(teamId: string): Promise<TeamResult> {
  try {
    const session = await getSession();
    if (!session) {
      return { success: false, message: "Unauthorized", error: "Unauthorized" };
    }

    await dbConnect();

    const team = await Team.findOne({
      _id: teamId,
      createdBy: session.userId,
    });

    if (!team) {
      return {
        success: false,
        message: "Team not found",
        error: "Not Found",
      };
    }

    // Delete team
    await Team.deleteOne({ _id: teamId });

    revalidatePath("/teams");

    return {
      success: true,
      message: "Team deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to delete team",
      error: error.message,
    };
  }
}

export async function createMemberAction(
  formData: FormData
): Promise<TeamResult> {
  const session = await getSession();

  if (!session)
    return {
      success: false,
      message: "You are unauthorized to perform this action",
      error: "Unauthorized",
    };

  const teamId = formData.get("teamId") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const capacity = parseInt(formData.get("capacity") as string);

  const validation = memberSchema.safeParse({ name, role, capacity });

  if (!validation.success) {
    const formattedErrors = validation.error.flatten().fieldErrors;

    console.log("formattedErrors: ", formattedErrors);

    return {
      success: false,
      message: "Validation error",
      // error: formattedErrors,
    };
  }

  await dbConnect();

  const MemberData = await Member.create({
    name,
    role,
    capacity,
    teamId,
    createdBy: session.userId,
  });

  revalidatePath("/teams");
  revalidatePath(`/teams/${teamId}`);
  return {
    success: true,
    message: "MemberData created successfully",
    data: MemberData,
  };
}
