import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./features/search-input/searchSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      search: searchSlice,
    },
  });
};
