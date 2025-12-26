import { createSlice } from "@reduxjs/toolkit";

const document = createSlice({
  name: "document",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = document.actions;
export default document.reducer;
