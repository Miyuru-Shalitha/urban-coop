import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  username: "",
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (
      state,
      action: PayloadAction<{
        email: string;
        password: string;
      }>
    ) => {
      state.isAuthenticated = true;
    },
  },
});

export const { logIn } = authSlice.actions;
export default authSlice.reducer;
