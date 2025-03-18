import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentTime } from "../utils/currentTime.js";
import { getAllTodos } from "../api/todos.js";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [authStatus, setAuthStatus] = useState(false);
  const [user, setUser] = useState(null);

  const saveUser = (user) => {
    setUser(user);
    setAuthStatus(true);
  };

  const removeUser = () => {
    setUser(null);
    setAuthStatus(false);
  };

  const addTodoContext = (todo) => {
    let time = getCurrentTime();
    setTodos((prev) => [...prev, { ...todo }]);
  };

  const updateTodoContext = (_id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo._id === _id ? { ...todo, date: getCurrentTime() } : prevTodo
      )
    );
  };

  const deleteTodoContext = (_id) => {
    setTodos((prev) => prev.filter((todo) => todo._id !== _id));
  };

  const toggleCompleteContext = (_id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo._id === _id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await getAllTodos();
        const fetchedTodos = res.data.todos;
        if (fetchedTodos && fetchedTodos.length > 0) {
          setTodos(fetchedTodos);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
  
    fetchTodos();
  }, []);
  

  return (
    <TodoContext.Provider
      value={{
        user,
        authStatus,
        todos,
        saveUser,
        removeUser,
        setAuthStatus,
        addTodoContext,
        updateTodoContext,
        deleteTodoContext,
        toggleCompleteContext,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  return useContext(TodoContext);
};
