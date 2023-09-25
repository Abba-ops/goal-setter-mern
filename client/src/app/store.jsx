import goalsReducer from "../features/goals/goalsSlice";
import authReducer from "../features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
