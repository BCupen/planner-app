import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateUserRequest, LoginUserRequest } from "../types";

const baseUrl = "http://localhost:8686/auth";
export const userApiSlice = createApi({
  reducerPath: "userApiSlice",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user: LoginUserRequest) => ({
        method: "POST",
        url: "/login",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    registerUser: builder.mutation({
      query: (user: CreateUserRequest) => ({
        method: "POST",
        url: "/register",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = userApiSlice;
