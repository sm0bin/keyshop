import type { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  id: string;
  email: string;
  name: string;
  photo: string;
  role: "superAdmin" | "admin" | "user";
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  status: "active" | "blocked";
  isDeleted: boolean;
}

interface IAuthState {
  user: null | IUser;
  token: null | string;
}

const initialState: IAuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
