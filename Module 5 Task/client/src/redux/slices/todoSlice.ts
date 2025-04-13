import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodoType {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  date: Date;
}

export interface CounterState {
  status: boolean;
  todos: Array<TodoType>;
}

const initialState: CounterState = {
  status: false,
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // saves the all todos of the user
    saveTodoInfo: (state, action) => {
      state.todos = action.payload
    },
    // insert a todo
    insertTodo: (state,action) => {
      state.todos.push(action.payload);
    },
    // update the current todo if user insert a new todo to update a todo
    updateTodo: (
      state,
      action: PayloadAction<{ updatedTodo: Partial<TodoType> }>
    ) => {
      state.todos = state.todos.map((todo) =>
        todo._id === action.payload.updatedTodo._id
          ? { ...todo, ...action.payload.updatedTodo }
          : todo
      );
    },
    // if user deletes a todo
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    // if user wanted to toggleComplete the todo
    toggleCompleted: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo._id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
  },
});

export const { saveTodoInfo, insertTodo, updateTodo, deleteTodo, toggleCompleted } =
  todoSlice.actions;

export default todoSlice.reducer;
