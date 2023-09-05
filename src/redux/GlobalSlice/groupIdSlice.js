import { createSlice } from "@reduxjs/toolkit";
import { getIdGroup } from "../../api/getIdGroup";

const idGroupSlice = createSlice({
  name: "getIdGroup",
  initialState: {
    isLoading: "default",
    message: "",
    data: [],
  },
  reducers: {},
  extraReducers: {
    [getIdGroup.pending]: (state) => {
      state.isLoading = "active";
    },
    [getIdGroup.fulfilled]: (state, action) => {
      state.isLoading = "default";
      state.data = action.payload.data;
    },
    [getIdGroup.rejected]: (state, action) => {
      state.isLoading = "default";
      state.message = action.payload;
    },
  },
});

export default idGroupSlice;
