import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const upload = createSlice({
  name: "upload",
  initialState,
  reducers: {
    uploadStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    uploadSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    uploadFailure: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },
    resetUpload: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const { uploadStart, uploadSuccess, uploadFailure, resetUpload } =
  upload.actions;

export default upload.reducer;
