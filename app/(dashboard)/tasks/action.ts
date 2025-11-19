// "use server";

// import { getSession } from "@/lib/action";
// import dbConnect from "@/lib/db";
// import Task from "@/lib/models/task-model";
// import { taskSchema } from "@/lib/validation";
// import { revalidatePath } from "next/cache";

// export interface Result {
//   success: boolean;
//   message: string;
//   error?: string;
//   data?: object;
// }

// export async function createTaskAction(formData: FormData): Promise<Result> {
//   const session = await getSession();

//   if (!session)
//     return {
//       success: false,
//       message: "You are unauthorized to perform this action",
//       error: "Unauthorized",
//     };

//   const title = formData.get("title") as string;
//   const description = formData.get("description") as string;
//   const priority = formData.get("priority") as string;
//   const status = formData.get("status") as string;
//   const projectId = formData.get("projectId") as string;
//   const assignedMemberId = formData.get("assignedMemberId") as string;

//   const validation = taskSchema.safeParse({
//     title,
//     description,
//     priority,
//     status,
//   });

//   // console.log("Zod Issues:", validation?.error?.issues);

//   if (!validation.success) {
//     const formattedErrors = validation.error.flatten().fieldErrors;

//     console.log("formattedErrors: ", formattedErrors);

//     return {
//       success: false,
//       message: "Validation error",
//       // error: formattedErrors,
//     };
//   }

//   await dbConnect();

//   const TaskData = await Task.create({
//     title,
//     description,
//     priority,
//     status,
//     projectId,
//     assignedMemberId,
//     createdBy: session.userId,
//   });

//   revalidatePath("/teams");
//   return {
//     success: true,
//     message: "Team created successfully",
//     data: TaskData,
//   };
// }
