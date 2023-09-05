import { configureStore } from "@reduxjs/toolkit";
import scheduleSlice from "../GlobalSlice/scheduleSlice";
import idGroupSlice from "../GlobalSlice/groupIdSlice";

const store = configureStore({
  reducer: {
    schedule: scheduleSlice.reducer,
    idGroup: idGroupSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
