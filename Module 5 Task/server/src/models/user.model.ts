import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  fullname: string;
  password: string;
  refreshToken?: string | null;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
      lowercase: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>("User", userSchema);
