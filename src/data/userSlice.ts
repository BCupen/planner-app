// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface UserState {
  name: string | null;
  email: string | null;
}

const initialState: UserState = (() => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : { name: null, email: null };
})();

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      localStorage.setItem("user", JSON.stringify(action.payload)); // persist
    },
    removeUser: (state) => {
      state.name = null;
      state.email = null;
      localStorage.removeItem("user"); // clear
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const userState = (state: RootState) => state.user;

export default userSlice.reducer;
