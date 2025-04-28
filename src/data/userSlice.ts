import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface UserState {
  name: string | null;
  email: string | null;
}

const initialState: UserState = {
  name: null,
  email: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    removeUser: (state) => {
      state.name = null;
      state.email = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const userState = (state: RootState) => state.user;

export default userSlice.reducer;
