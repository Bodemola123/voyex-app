import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  googleUserDetails: null,
  gmailDetails: null,
};

export const authSlice = createSlice({
  name: "auth-input",
  initialState,
  reducers: {
    updateGoogleUserDetails: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        googleUserDetails: action.payload,
      };
    },
    updateGmailDetails: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        gmailDetails: action.payload,
      };
    },
  },
});

export const { updateGoogleUserDetails, updateGmailDetails } =
  authSlice.actions;

export default authSlice.reducer;
