import { createSlice } from "@reduxjs/toolkit";
import { getTokenWithExpiry } from "../utils/tokenUtils";

const initialState = {
  token: getTokenWithExpiry(),
  isAuthenticated: !!getTokenWithExpiry(),
  user: null,
  error: null,
  loading: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.token = null;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser, clearError } = auth.actions;
export default auth.reducer;
