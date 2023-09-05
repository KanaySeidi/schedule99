import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSchedule = createAsyncThunk(
  "get/data",
  async ({ groupId }, { rejectWithValue }, data) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await axios.get(`${apiUrl}?group_id=${groupId}`, data);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);
