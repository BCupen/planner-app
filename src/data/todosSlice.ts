import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Priority, Todo } from "./types";
import { RootState } from "./store";
import { generateUID } from "./utils";

const initialState: Todo[] = [
  {
    id: generateUID(),
    title: "Test Task 1",
    description: "This is a test description",
    completed: false,
    priority: Priority.LOW,
    dueDate: new Date().toISOString(),
  },
  {
    id: generateUID(),
    title: "Finish this project",
    description: "I really need to finish this project.",
    completed: false,
    priority: Priority.OVERDUE,
    dueDate: new Date().toISOString(),
  },
];

export const todosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state = [action.payload, ...state];
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
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, editTodo, completeTodo } = todosSlice.actions;

export const todoState = (state: RootState) => state.todos;

export default todosSlice.reducer;
