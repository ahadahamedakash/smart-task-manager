"use server";

import dbConnect from "@/lib/db";
import { revalidatePath } from "next/cache";

import { getSession } from "@/lib/action";
import Project from "@/lib/models/project-model";
import { projectSchema } from "@/lib/validation";

export interface ProjectResult {
  success: boolean;
  message: string;
  error?: string;
  data?: object;
}

export async function createProjectAction(
  formData: FormData
): Promise<ProjectResult> {
  const session = await getSession();

  if (!session)
    return {
      success: false,
      message: "You are unauthorized to perform this action",
      error: "Unauthorized",
    };

  const projectName = formData.get("projectName") as string;
  const description = formData.get("description") as string;
  const teamId = formData.get("teamId") as string;

  const validation = projectSchema.safeParse({
    projectName,
    description,
  });

  // console.log("Zod Issues:", validation?.error?.issues);

  if (!validation.success) {
    // const formattedErrors = validation.error.flatten().fieldErrors;

    return {
      success: false,
      message: "Validation error",
      // error: formattedErrors,
    };
  }

  await dbConnect();

  const ProjectData = await Project.create({
    projectName,
    description,
    createdBy: session.userId,
    teamId,
  });

  revalidatePath("/projects");
  return {
    success: true,
    message: "Project created successfully",
    data: ProjectData,
  };
}

export async function getProjectsAction(): Promise<ProjectResult> {
  try {
    const session = await getSession();

    if (!session)
      return {
        success: false,
        message: "You are unauthorized to perform this action",
        error: "Unauthorized",
      };

    await dbConnect();

    const ProjectData = await Project.find({
      createdBy: session.userId,
    })
      .populate("teamId", "teamName description createdBy _id")
      .lean();

    return {
      success: true,
      message: "Projects retrived successfully",
      data: ProjectData,
    };
  } catch (e: unknown) {
    return { success: false, message: "An error occured!", error: e as string };
  }
}

export async function deleteProjectAction(
  projectId: string
): Promise<ProjectResult> {
  try {
    const session = await getSession();
    if (!session) {
      return { success: false, message: "Unauthorized", error: "Unauthorized" };
    }

    await dbConnect();

    const project = await Project.findOne({
      _id: projectId,
      createdBy: session.userId,
    });

    if (!project) {
      return {
        success: false,
        message: "Team not found",
        error: "Not Found",
      };
    }

    await Project.deleteOne({ _id: projectId });

    revalidatePath("/teams");

    return {
      success: true,
      message: "Project deleted successfully",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to delete project",
      error: error.message,
    };
  }
}
