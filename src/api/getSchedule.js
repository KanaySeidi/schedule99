import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSchedule = createAsyncThunk(
  "get/data",
  async ({ groupId }, { rejectWithValue }, data) => {
    try {
      const res = await axios.get(
        `http://192.168.0.13:4321/schedules/?group_id=${groupId}`,
        data
      );
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);
