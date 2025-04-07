import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Todo } from "./types";

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (_state, action: PayloadAction<Todo[]>) => {
      return [...action.payload];
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    editTodo: (state, action) => {
      const todoIndex = state.findIndex(
        (todo: Todo) => todo.id === action.payload.id
      );
      if (todoIndex > -1) {
        state[todoIndex] = action.payload.todo;
      }
    },
    completeTodo: (state, action) => {
      const todoIndex = state.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (todoIndex > -1) {
        state[todoIndex].completed = action.payload.value;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const newTodos = [...state.filter((todo) => todo.id !== action.payload)];
      return [...newTodos];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTodos, addTodo, editTodo, completeTodo, removeTodo } =
  todosSlice.actions;

export const todoState = (state: RootState) => state.todos;

export default todosSlice.reducer;
