import { useState } from "react";
import { updateTodo } from "../apis/todos.api.js";
import { useDispatch } from "react-redux";
import {
  updateTodo as updateTodoRedux,
  toggleCompleted as toggleCompletedRedux,
} from "../redux/slices/todoSlice.js";
import { Pencil, Save, Trash2 } from "lucide-react";
import DeletePopup from "./DeletePopup.js";

function TodoItem({ todo }: { todo: any }) {
  const dispatch = useDispatch();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.content);
  const [showPopup, setShowPopup] = useState<Boolean>(false);

  const editTodo = async () => {
    try {
      console.log(todo.id)
      const res = await updateTodo({
        id: todo.id,
        content: todoMsg,
      });

      console.log(res);

      dispatch(updateTodoRedux({ updatedTodo: res?.data.updatedTodo }));
    } catch (err: any) {
      console.log(err.message);
    }
    setIsTodoEditable(false);
  };

  const toggleCompleted = async () => {
    try {
      const res: any = await updateTodo({
        id: todo.id,
        completed: !todo.completed,
      });

      console.log(" res: " + res);

      dispatch(toggleCompletedRedux(res?.todo.id));
    } catch (error) {}

    dispatch(toggleCompletedRedux(todo.id));
  };

  return (
    <>
      <DeletePopup showPopup={showPopup} setShowPopup={setShowPopup} todoId={todo.id}/>
      <li className={`flex w-full items-center justify-start p-4 md:p-6`}>
        <input
          type="checkbox"
          id="checkbox-9"
          checked={todo.completed}
          onChange={toggleCompleted}
          className={`${
            todo.completed
              ? "[&:checked+div+p]:text-[#898989] [&:checked+div]:line-through [&:checked+div]:bg-green-500 [&:checked+div_svg]:block border-black "
              : ""
          }
        absolute h-5 w-5 cursor-pointer opacity-0 md:h-6 md:w-6`}
          name="checkbox-9"
        />
        <div className="rounded-xl mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center border-[1px] border-black bg-transparent focus-within:border-white md:mr-4 md:h-6 md:w-6">
          <svg
            className="pointer-events-none hidden h-3 w-3 fill-current text-white"
            version="1.1"
            viewBox="0 0 17 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fill-rule="evenodd">
              <g
                transform="translate(-9 -11)"
                fill="#000000"
                fill-rule="nonzero"
              >
                <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"></path>
              </g>
            </g>
          </svg>
        </div>

        <input
          type="text"
          className={`text-black border outline-none w-full bg-transparent rounded-lg 
                ${
                  isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } 
                ${todo.completed ? "line-through text-opacity-50" : ""}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
        <div className="ml-auto flex flex-shrink-0 border-[1px] border-white px-2 py-1 text-xs text-black md:text-sm">
          {new Date(todo.updatedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
        <button
          onClick={() => {
            setShowPopup(true);
          }}
          className="rounded-2xl hover:cursor-pointer ml-2 flex flex-shrink-0 border-[1px] border-red-500 bg-red-500 p-1"
        >
          <Trash2 />
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
            className="rounded-2xl hover:cursor-pointer ml-2 flex flex-shrink-0 border-[1px] border-blue-500 bg-blue-500 p-1"
          >
            {isTodoEditable ? <Save /> : <Pencil />}
          </button>
        )}
      </li>
    </>
  );
}

export default TodoItem;
