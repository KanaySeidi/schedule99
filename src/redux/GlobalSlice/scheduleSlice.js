import { createSlice } from "@reduxjs/toolkit";
import { getSchedule } from "../../api/getSchedule";

const scheduleSlice = createSlice({
  name: "getSchedule",
  initialState: {
    isLoading: "default",
    message: "",
    data: [],
  },
  reducers: {},
  extraReducers: {
    [getSchedule.pending]: (state) => {
      state.isLoading = "active";
    },
    [getSchedule.fulfilled]: (state, action) => {
      state.isLoading = "default";
      state.data = action.payload;
    },
    [getSchedule.rejected]: (state, action) => {
      state.isLoading = "default";
      state.message = action.payload;
    },
  },
});

export default scheduleSlice;
