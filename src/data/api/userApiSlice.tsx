import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8686/auth";
export const userApiSlice = createApi({
  reducerPath: "userApiSlice",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => ({
        method: "POST",
        url: "/login",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginUserMutation } = userApiSlice;
