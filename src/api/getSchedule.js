import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MockAPI } from "../utils/const";

export const getSchedule = createAsyncThunk(
  "get/data",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(MockAPI);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);
