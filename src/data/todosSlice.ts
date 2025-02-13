import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Todo } from './types'
import { RootState } from './store'

const initialState: Todo[] = []

export const todosSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state = [action.payload, ...state];
    },
  },
})

// Action creators are generated for each case reducer function
export const { addTodo } = todosSlice.actions;

export const todoState = (state: RootState) => state.todos; 

export default todosSlice.reducer;