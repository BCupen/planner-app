import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";
import userReducer from "./userSlice";
import { todoApiSlice } from "./api/todoApiSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    user: userReducer,
    [todoApiSlice.reducerPath]: todoApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
