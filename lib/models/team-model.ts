import { Document, model, models, Schema, Types } from "mongoose";

export interface ITeam extends Document {
  teamName: string;
  description: string;
  createdBy: Types.ObjectId;
}

const TeamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: [true, "Team name is required"],
    },
    description: {
      type: String,
      required: [true, "Team name is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Team = models.Team || model<ITeam>("Team", TeamSchema);

export default Team;
