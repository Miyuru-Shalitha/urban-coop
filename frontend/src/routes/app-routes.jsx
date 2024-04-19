import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CheckLoginStatus from "./CheckLoginStatus";
import { USER_ROLES } from "../constants/roles";

import {
  Home,
  Login,
  Signup,
  AdminDashboard,
  CustomerDashboard,
} from "../pages";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Check Login Status */}
          <Route element={<CheckLoginStatus />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Admin Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.ADMIN]} />}
          >
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Customer Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.CUSTOMER]} />}
          >
            <Route path="/customer" element={<CustomerDashboard />} />
          </Route>

          {/* return 404 page */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
