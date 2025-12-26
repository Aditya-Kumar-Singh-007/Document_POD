import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  deleted: false,
};

const deleteSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {
    deleteStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleted = false;
    },
    deleteSuccess: (state) => {
      state.loading = false;
      state.deleted = true;
    },
    deleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetDelete: (state) => {
      state.loading = false;
      state.error = null;
      state.deleted = false;
    },
  },
});

export const {
  deleteStart,
  deleteSuccess,
  deleteFailure,
  resetDelete,
} = deleteSlice.actions;

export default deleteSlice.reducer;
