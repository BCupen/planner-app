import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TodoPatchRequest } from "../types";

const baseUrl = "http://localhost:8686/todos";

export const todoApiSlice = createApi({
  reducerPath: "todoApiSlice",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/",
      providesTags: ["Todo"],
    }),
    createTodo: builder.mutation({
      query: (newTodo) => ({
        method: "POST",
        url: "/",
        body: newTodo,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation({
      query: (todoId) => ({
        method: "DELETE",
        url: `/${todoId}`,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation({
      query: ({ updatedTodo, todoId }: TodoPatchRequest) => ({
        method: "PATCH",
        url: `/${todoId}`,
        body: updatedTodo,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useLazyGetTodosQuery,
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoApiSlice;
