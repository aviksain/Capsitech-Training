import { Schema, model } from "mongoose";

const schemaObj = {
  email: {
    type: "string",
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullname: {
    type: "string",
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: "string",
    required: [true, "Password is required"],
  }
};

const userSchema = new Schema(schemaObj, { timestamps: true });

export const User = model("User", userSchema);
