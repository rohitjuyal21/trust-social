import { Document, model, models, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  profileImage: string;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = models?.User || model<IUser>("User", userSchema);
