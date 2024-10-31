import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInput: "",
  messages: [],
};

const searchSlice = createSlice({
  name: "search-input",
  initialState,
  reducers: {
    updateSearchValue(state, action) {
      return { ...state, userInput: action.payload };
    },
    clearSearchValue(state) {
      return { ...state, search: "" };
    },
    updateMessages(state, action) {
      return { ...state, messages: [...state.messages, action.payload] };
    },
  },
});

export const { updateSearchValue, updateMessages, clearSearchValue } =
  searchSlice.actions;
export default searchSlice.reducer;
