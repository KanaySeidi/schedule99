import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getIdGroup = createAsyncThunk(
  "get/idGroup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://192.168.0.13:4321/api/groups/", data);
      return res;
    } catch (err) {
      rejectWithValue(err.res.data);
    }
  }
);
