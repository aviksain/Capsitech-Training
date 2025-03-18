import { Todo } from "../models/todo.model.js";

export const createTodo = async (req, res) => {
  try {
    const { content, time } = req.body;

    if (!content) {
      return req.status(400).json({ message: "Content is required." });
    }

    if (!req.user) {
      return req
        .status(400)
        .json({ message: "Needed to login before creating todo." });
    }

    const todo = await Todo.create({
      owner: req.user._id,
      content,
      time,
      completed: false,
    });

    if (!todo) {
      return req
        .status(400)
        .json({ message: "Something went wrong creating todo." });
    }

    return res
      .status(201)
      .json({ todo: todo, message: "Todo Created Successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { content, completed, time } = req.body;
    const { todoId } = req.params;

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (content !== undefined) todo.content = content;
    if (completed !== undefined) todo.completed = completed;

    todo.time = time;
    
    await todo.save();

    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const userId = req.user._id;

    const todos = await Todo.find({ owner: userId });

    return res.status(200).json({ todos });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
