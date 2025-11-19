import { Document, model, models, Schema, Types } from "mongoose";

export interface IMember extends Document {
  name: string;
  role: string;
  capacity: number;
  createdBy: Types.ObjectId;
}

const MemberSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Member name is required"],
    },
    role: {
      type: String,
      required: [true, "Member role is required"],
    },
    capacity: {
      type: String,
      required: [true, "Capacity is required"],
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
      index: true,
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

const Member = models.Member || model<IMember>("Member", MemberSchema);

export default Member;
