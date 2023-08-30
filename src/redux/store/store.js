import { configureStore } from "@reduxjs/toolkit";
import scheduleSlice from "../GlobalSlice/scheduleSlice";

const store = configureStore({
  reducer: {
    schedule: scheduleSlice.reducer,
  },
});

export default store;
