import React from "react";
import { useState } from "react";
import { useTodo } from "../Context/TodoContext.jsx";
import { deleteTodo, updateTodo } from "../api/todos.js";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.content);
  const { updateTodoContext, deleteTodoContext, toggleCompleteContext } =
    useTodo();

  const editTodo = async () => {
    try {
      let date = new Date();
      await updateTodo(todo._id, { content: todoMsg, time: date });
    } catch (err) {
      console.log(err.message);
    }

    updateTodoContext(todo._id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = async () => {
    let date = new Date();

    await updateTodo(todo._id, { time: date, completed: !todo.completed });

    toggleCompleteContext(todo._id);
  };

  return (
    <li className={`flex w-full items-center justify-start p-4 md:p-6`}>
      <input
        type="checkbox"
        id="checkbox-9"
        checked={todo.completed}
        onChange={toggleCompleted}
        className={`${
          toggleCompleted
            ? "[&:checked+div+p]:text-[#898989] [&:checked+div]:line-through [&:checked+div]:bg-green-500 [&:checked+div_svg]:block"
            : ""
        }
        absolute h-5 w-5 cursor-pointer opacity-0 md:h-6 md:w-6`}
        name="checkbox-9"
      />
      <div className="mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center border-[1px] border-white bg-transparent focus-within:border-white md:mr-4 md:h-6 md:w-6">
        <svg
          className="pointer-events-none hidden h-3 w-3 fill-current text-white"
          version="1.1"
          viewBox="0 0 17 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fill-rule="evenodd">
            <g transform="translate(-9 -11)" fill="#000000" fill-rule="nonzero">
              <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"></path>
            </g>
          </g>
        </svg>
      </div>

      <input
        type="text"
        className={`text-white border outline-none w-full bg-transparent rounded-lg 
                ${
                  isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } 
                ${todo.completed ? "line-through text-opacity-50" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <div className="ml-auto flex flex-shrink-0 border-[1px] border-white px-2 py-1 text-xs text-white md:text-sm">
        {new Date(todo.time).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </div>
      <button
        onClick={async () => {
          await deleteTodo(todo._id);
          deleteTodoContext(todo._id);
        }}
        className="ml-2 flex flex-shrink-0 border-[1px] border-red-500 bg-red-500 p-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-trash-2"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" x2="10" y1="11" y2="17" />
          <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
      </button>
      {todo.completed ? null : (
        <button
          onClick={() => {
            if (todo.completed) return;

            if (isTodoEditable) {
              editTodo();
            } else {
              setIsTodoEditable((prev) => !prev);
            }
          }}
          disabled={todo.completed}
          className="ml-2 flex flex-shrink-0 border-[1px] border-blue-500 bg-blue-500 p-1"
        >
          {isTodoEditable ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-save"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-pencil"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          )}
        </button>
      )}
    </li>
  );
}

export default TodoItem;
