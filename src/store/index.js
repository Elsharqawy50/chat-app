import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import chatReducer from "./reducers/chat";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
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
