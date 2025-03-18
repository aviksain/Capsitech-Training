import { Schema, model } from "mongoose";

const schemaObj = {
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  content: {
    type: "String",
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  completed: {
    type: "Boolean",
    default: false,
  }
};

const todoSchema = new Schema(schemaObj, { timestamps: true });

export const Todo = model('Todo', todoSchema);
