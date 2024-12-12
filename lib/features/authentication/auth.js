import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  googleUserDetails: null,
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
  },
});

export const { updateGoogleUserDetails } = authSlice.actions;

export default authSlice.reducer;
