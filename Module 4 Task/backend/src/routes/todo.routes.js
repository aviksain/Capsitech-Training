import { Router } from "express";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodos,
} from "../controllers/todo.controller.js";

import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();

router.route("/create").post(verifyJWT, createTodo);
router.route("/update/:todoId").post(verifyJWT, updateTodo);
router.route("/delete/:todoId").post(verifyJWT, deleteTodo);
router.route("/get-all").get(verifyJWT, getAllTodos);

export default router;
