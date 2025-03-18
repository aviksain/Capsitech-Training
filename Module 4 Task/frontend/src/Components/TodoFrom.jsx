import React from "react";
import { useTodo } from "../Context/TodoContext";
import { useFormik } from "formik";
import { createTodo } from "../api/todos.js";
import { getCurrentTime } from "../utils/currentTime.js";

function TodoForm() {
  const { addTodoContext } = useTodo();

  const myForm = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: async (values, { resetForm }) => {
      if (!values.content.trim()) return;

      let date = new Date();

      const res = await createTodo({content: values.content, time: date});
      console.log(res.data.todo);

      addTodoContext(res.data.todo);
      

      resetForm();
    },
  });

  return (
    <li className="flex w-full items-center justify-start">
      <form
        onSubmit={myForm.handleSubmit}
        className="flex w-full justify-between"
      >
        <input
          name="content"
          placeholder="Type to add a new todo..."
          value={myForm.values.content}
          onChange={myForm.handleChange}
          className="w-full bg-transparent p-4 text-white placeholder:text-gray-500 md:p-6"
        />
        <button
          type="submit"
          className="bg-green-500 p-4 text-center text-black hover:bg-green-400 active:bg-green-600 md:p-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-8 w-8"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </form>
    </li>
  );
}

export default TodoForm;
