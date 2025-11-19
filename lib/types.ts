export type TTeam = {
  _id: string;
  teamName: string;
  description: string;
  createdBy: string;
};

export type TProject = {
  _id: string;
  projectName: string;
  description: string;
  teamId: string;
  createtBy: string;
  task_count?: number;
};
