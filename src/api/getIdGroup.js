import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getIdGroup = createAsyncThunk(
  "get/idGroup",
  async (data, { rejectWithValue }) => {
    try {
      const apiGroup = process.env.REACT_APP_API_GROUP;
      const res = await axios.get(apiGroup, data);
      return res;
    } catch (err) {
      rejectWithValue(err.res.data);
    }
  }
);
