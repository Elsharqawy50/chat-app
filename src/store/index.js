import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["user/setUser"],
        ignoredPaths: ["auth.user"],
      },
    }),
});

export default store;
