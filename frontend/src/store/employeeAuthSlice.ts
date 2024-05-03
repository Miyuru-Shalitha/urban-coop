import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  employee: {
    isAuthenticated: false,
    _id: "",
    employeeId: "",
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
        employeeId: string;
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
    logOut: (state, action) => {
      state.employee.isAuthenticated = false;
      state.employee._id = "";
      state.employee.firstName = "";
      state.employee.lastName = "";
      state.employee.email = "";
    },
  },
});

export const { logIn, logOut } = employeeAuthSlice.actions;
export default employeeAuthSlice.reducer;
