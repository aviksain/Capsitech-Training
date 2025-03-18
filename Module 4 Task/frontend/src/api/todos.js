import axiosInstance from "../utils/axiosInstance.js";

const createTodo = async (todo) => {
  const res = await axiosInstance.post("/todos/create", todo);
  return res;
};

const updateTodo = async (todoId, todo) => {
  try {
    const res = await axiosInstance.post(`/todos/update/${todoId}`, todo);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (id) => {
  const res = await axiosInstance.post(`/todos/delete/${id}`);
  return res;
};

const getAllTodos = async () => {
  const res = await axiosInstance.get("/todos/get-all");
  return res;
};

export { createTodo, updateTodo, deleteTodo, getAllTodos };
