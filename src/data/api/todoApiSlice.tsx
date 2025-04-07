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
  }),
});

export const { useGetTodosQuery } = todoApiSlice;
