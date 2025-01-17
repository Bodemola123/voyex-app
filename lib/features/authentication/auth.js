import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  googleUserDetails: null,
  gmailDetails: null,
  orgOverlay: false,
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
    updateOrgOverlay: (state, action) => {
      return {
        ...state,
        orgOverlay: action.payload,
      };
    },
  },
});

export const { updateGoogleUserDetails, updateGmailDetails, updateOrgOverlay } =
  authSlice.actions;

export default authSlice.reducer;
