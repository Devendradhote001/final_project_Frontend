import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/auth/authSlice";
import themeReducer from "../shared/state/themeSlice";

export let store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
});
