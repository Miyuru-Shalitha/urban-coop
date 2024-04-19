import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import employeeAuthReducer from "./employeeAuthSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    employeeAuth: employeeAuthReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
