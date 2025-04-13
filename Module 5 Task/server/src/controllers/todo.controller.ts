import { Request, Response } from "express";
import { Todo } from "../models/todo.model.js";
import { IUser } from "../models/user.model.js";

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const createTodo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { content } = req.body;

    if (!req.user) {
      res.status(401).json({
        message: "You need to log in before creating a todo.",
      });
      return;
    }

    const todo = await Todo.create({
      owner: req.user._id,
      content,
      completed: false,
    });

    if (!todo) {
      res.status(400).json({ message: "Something went wrong creating todo." });
      return;
    }

    res.status(201).json({ todo, message: "Todo Created Successfully" });
  } catch (err) {
    res.status(500).json({
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const updateTodo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { todoId } = req.params;
    const { content, completed } = req.body;

    const todo = await Todo.findById(todoId);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    if (content !== undefined) todo.content = content;
    if (completed !== undefined) todo.completed = completed;

    const updatedTodo = await todo.save();

    res.status(200).json({ message: "Todo updated successfully", updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deleteTodo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { todoId } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getAllTodos = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const todos = await Todo.find({ owner: req.user._id });

    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};




