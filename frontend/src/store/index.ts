import { configureStore } from "@reduxjs/toolkit";
import listPageviewDesignReducer from "./slices/listPageviewDesignSlice";

export const store = configureStore({
  reducer: {
    listPageviewDesign: listPageviewDesignReducer,
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
