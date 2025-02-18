import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Priority, Todo } from "./types";
import { RootState } from "./store";

const initialState: Todo[] = [
  {
    title: "Test Task 1",
    description: "This is a test description",
    completed: false,
    priority: Priority.LOW,
    dueDate: new Date(),
  },
  {
    title: "Finish this project",
    description: "I really need to finish this project.",
    completed: false,
    priority: Priority.HIGH,
    dueDate: new Date(),
  },
];

export const todosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state = [action.payload, ...state];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo } = todosSlice.actions;

export const todoState = (state: RootState) => state.todos;

export default todosSlice.reducer;
