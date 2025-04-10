import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8686/todos";

export const todoApiSlice = createApi({
  reducerPath: "todoApiSlice",
  baseQuery: fetchBaseQuery({ baseUrl }),
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
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
} = todoApiSlice;
