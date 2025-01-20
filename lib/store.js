import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./features/search-input/searchSlice";
import authSlice from "./features/authentication/auth";

export const makeStore = () => {
  return configureStore({
    reducer: {
      search: searchSlice,
      auth: authSlice,
    },
  });
};
