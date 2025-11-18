import { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  fullName: string;
  userName: string;
  password: string;
  comparePassword(userPassword: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    userName: {
      type: String,
      required: [true, "User name is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const saltRound = Number(process.env.BCRYPT_SALT_ROUND);
  const salt = await bcrypt.genSalt(saltRound);

  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  return bcrypt.compare(userPassword, this.password);
};

const User = models.User || model<IUser>("User", UserSchema);

export default User;
