import { Schema, model, Document, Types } from "mongoose";

interface ITodo extends Document {
  owner: Types.ObjectId;
  content: string;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Todo = model<ITodo>("Todo", todoSchema);
