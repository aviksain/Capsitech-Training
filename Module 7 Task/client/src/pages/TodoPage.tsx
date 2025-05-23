import { Link } from "react-router-dom";
import TodoForm from "../components/TodoFrom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "../components/TodoItem";
import { saveTodoInfo, TodoType } from "../redux/slices/todoSlice";
import { getAllTodo } from "../apis/todos.api";
import { logoutUser } from "../apis/users.api";
import { deleteUserData } from "../redux/slices/authSlice";

function TodoPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.userData);
  const todos = useSelector((state: any) => state.todo.todos);
  const [todoType, setTodoType] = useState("AllTodos");

  const handelLogout = async () => {
    try {
      await logoutUser();
      dispatch(deleteUserData());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetch() {
      const res = await getAllTodo();

      if (res) {
        console.log(res);
        dispatch(saveTodoInfo(res.data));
      }
    }

    fetch();
  }, []);

  return (
    <>
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">TaskFlow</span>
            <img
              className="h-8 w-auto"
              src="https://www.svgrepo.com/show/356977/todo-list.svg"
              alt=""
            />
          </Link>
        </div>
        <div className=" lg:flex lg:flex-1 lg:justify-end flex items-center justify-center gap-x-6">
          {user ? (
            <>
              <button
                onClick={handelLogout}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer"
              >
                Log in
              </Link>
              <Link
                to="/sign-up"
                className="text-sm/6 font-semibold text-gray-900 hover:cursor-pointer"
              >
                Sign up <span aria-hidden="true">→</span>
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="min-h-screen bg-white text-black">
        <div className="mx-auto flex h-full min-h-screen w-full max-w-full flex-col items-start justify-start px-4 py-28 text-center md:max-w-5xl">
          <div className="flex w-full flex-col gap-5">
            <div className="flex w-full flex-shrink-0 flex-wrap items-center justify-start gap-3 md:gap-6">
              <button
                onClick={() => setTodoType("AllTodos")}
                className={`${
                  todoType === "AllTodos"
                    ? "border-[1px] border-[#615FFF] bg-[#615FFF] text-white"
                    : "hover:bg-gray-200 md:text-base"
                } px-3 py-2 text-sm font-semibold rounded-xl md:text-base hover:cursor-pointer`}
              >
                All todos
              </button>
              <button
                onClick={() => setTodoType("Pending")}
                className={`${
                  todoType === "Pending"
                    ? "border-[1px] border-[#615FFF] bg-[#615FFF] text-white"
                    : "hover:bg-gray-200 md:text-base"
                } px-3 py-2 text-sm font-semibold rounded-xl hover:bg-[8989ff] md:text-base hover:cursor-pointer`}
              >
                Pending
              </button>
              <button
                onClick={() => setTodoType("Completed")}
                className={`${
                  todoType === "Completed"
                    ? "border-[1px] border-[#615FFF] bg-[#615FFF] text-white"
                    : "hover:bg-gray-200 md:text-base"
                } px-3 py-2 text-sm font-semibold rounded-xl hover:bg-[8989ff] md:text-base hover:cursor-pointer`}
              >
                Completed
              </button>
            </div>
            <ul className="divide-y-[1px] divide-white border-[1px] border-white p-0">
              <TodoForm />
              {todoType === "AllTodos"
                ? todos?.map((todo: TodoType) => (
                    <div key={todo.id} className="w-full">
                      <TodoItem todo={todo} />
                    </div>
                  ))
                : todoType === "Pending"
                ? todos?.map((todo: TodoType) =>
                    !todo.completed ? (
                      <div key={todo.id} className="w-full">
                        <TodoItem todo={todo} />
                      </div>
                    ) : null
                  )
                : todos?.map((todo: TodoType) =>
                    todo.completed ? (
                      <div key={todo.id} className="w-full">
                        <TodoItem todo={todo} />
                      </div>
                    ) : null
                  )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoPage;
