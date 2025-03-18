import React, { useState } from "react";
import { TodoFrom, TodoItem, EmptyPage } from "./index.js";
import { TodoProvider, useTodo } from "../Context/TodoContext";

function Body() {
  const { todos } = useTodo();
  const [showTodo, setShowTodo] = useState(false);
  const [todoType, setTodoType] = useState("AllTodos");

  return (
    <>
      {todos.length === 0 && !showTodo ? (
        <EmptyPage onClick={setShowTodo} />
      ) : (
        <div className="mx-auto flex h-full min-h-screen w-full max-w-full flex-col items-start justify-start px-4 py-28 text-center md:max-w-5xl">
          <div className="flex w-full flex-col gap-5">
            <div className="flex w-full flex-shrink-0 flex-wrap items-center justify-start gap-3 md:gap-6">
              <button
                onClick={() => setTodoType("AllTodos")}
                className={`${
                  todoType === "AllTodos"
                    ? "border-[1px] border-[#565656] bg-[#232323]"
                    : ""
                } px-3 py-2 text-sm font-semibold text-white hover:bg-[#232323] md:text-base`}
              >
                All todos
              </button>
              <button
                onClick={() => setTodoType("Pending")}
                className={`${
                  todoType === "Pending"
                    ? "border-[1px] border-[#565656] bg-[#232323]"
                    : ""
                } px-3 py-2 text-sm font-semibold text-white hover:bg-[#232323] md:text-base`}
              >
                Pending
              </button>
              <button
                onClick={() => setTodoType("Completed")}
                className={`${
                  todoType === "Completed"
                    ? "border-[1px] border-[#565656] bg-[#232323]"
                    : ""
                } px-3 py-2 text-sm font-semibold text-white hover:bg-[#232323] md:text-base`}
              >
                Completed
              </button>
            </div>
            <ul className="divide-y-[1px] divide-white border-[1px] border-white p-0">
              <TodoFrom />
              {todoType === "AllTodos"
                ? todos.map((todo) => (
                    <div key={todo._id} className="w-full">
                      <TodoItem todo={todo} />
                    </div>
                  ))
                : todoType === "Pending"
                ? todos.map((todo) =>
                    !todo.completed ? (
                      <div key={todo._id} className="w-full">
                        <TodoItem todo={todo} />
                      </div>
                    ) : null
                  )
                : todos.map((todo) =>
                    todo.completed ? (
                      <div key={todo._id} className="w-full">
                        <TodoItem todo={todo} />
                      </div>
                    ) : null
                  )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Body;
