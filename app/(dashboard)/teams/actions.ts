"use server";

import { revalidatePath } from "next/cache";

import dbConnect from "@/lib/db";
import Team from "@/lib/models/team-model";

import { getSession } from "@/lib/action";
import { teamSchema } from "@/lib/validation";

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
