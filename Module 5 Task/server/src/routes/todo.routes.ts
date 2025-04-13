import { Router } from "express";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodos,
} from "../controllers/todo.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { createTodoSchema, updateTodoSchema, validate } from "../middlewares/zodSchema.js";

const router: Router = Router();

router.route("/create").post(verifyJWT, validate(createTodoSchema), createTodo);
router.route("/update/:todoId").post(verifyJWT, validate(updateTodoSchema), updateTodo);
router.route("/delete/:todoId").post(verifyJWT, deleteTodo);
router.route("/get-all").get(verifyJWT, getAllTodos);

export default router;
