import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    isAuthenticated: true,
    username: "testuser",
    _id: "60f3b3b3b3b3b3b3b3b3b3b3",
    email: "testuser@gmail.com",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (
      state,
      action: PayloadAction<{
        username: string;
        email: string;
      }>
    ) => {
      state.user.isAuthenticated = true;
    },
  },
});

export const { logIn } = authSlice.actions;
export default authSlice.reducer;
