import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  employee: {
    isAuthenticated: false,
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
  },
};

const employeeAuthSlice = createSlice({
  name: "employeeAuth",
  initialState,
  reducers: {
    logIn: (
      state,
      action: PayloadAction<{
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
      }>
    ) => {
      state.employee.isAuthenticated = true;
      const { _id, firstName, lastName, email } = action.payload;
      state.employee._id = _id;
      state.employee.firstName = firstName;
      state.employee.lastName = lastName;
      state.employee.email = email;
    },
  },
});

export const { logIn } = employeeAuthSlice.actions;
export default employeeAuthSlice.reducer;
