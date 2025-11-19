import { Document, model, models, Schema, Types } from "mongoose";

export interface IProject extends Document {
  projectName: string;
  description: string;
  createdBy: Types.ObjectId;
  teamId: Types.ObjectId;
}

const ProjectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: [true, "Project name is required"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = models.Project || model<IProject>("Project", ProjectSchema);

export default Project;
