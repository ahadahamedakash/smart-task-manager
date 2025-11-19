export type TTeam = {
  _id: string;
  teamName: string;
  description: string;
  createdBy: string;
};

export type TMember = {
  _id: string;
  teamId: string;
  name: string;
  role: string;
  capacity: number;
  taskCount?: number;
};

export type TProject = {
  _id: string;
  projectName: string;
  description: string;
  teamId: string;
  createtBy: string;
  task_count?: number;
};

export type Task = {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Done";
  assignedMemberId: string | null;
  project?: TProject;
  member?: TMember;
};
