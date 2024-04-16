import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import EventPage from "./pages/EventPage";
import EventCreationForm from "./pages/EventCreationForm";
import EmployeeManagementAdminPage from "./pages/EmployeeManagementAdminPage/EmployeeManagementAdminPage";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import Layout from "./components/Layout";
import EventDash from "./pages/EventDash";
import UpdateEvent from "./pages/UpdateEvent";
import EmployeeManagementEmployeesAdminPage from "./pages/EmployeeManagementAdminPage/EmployeeManagementEmployeesAdminPage";
import EmployeeManagementRolesAdminPage from "./pages/EmployeeManagementAdminPage/EmployeeManagementRolesPage";
import EmployeeManagementSalaryPage from "./pages/EmployeeManagementAdminPage/EmployeeManagementSalaryPage";
import PetDaycareBookingPage from "./pages/PetDaycareBookingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="log-in" element={<LogInPage />} />
          <Route path="events" element={<EventPage />} />
          <Route path="create" element={<EventCreationForm />} />
          <Route path="event-dashboard" element={<EventDash />} />
          <Route path="update" element={<UpdateEvent />} />
          <Route path="daycare" element={<PetDaycareBookingPage />} />
        </Route>

        {/* Employee Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="employee-management"
            element={<EmployeeManagementAdminPage />}
          />
          <Route
            path="employee-management/employees"
            element={<EmployeeManagementEmployeesAdminPage />}
          />
          <Route
            path="employee-management/roles"
            element={<EmployeeManagementRolesAdminPage />}
          />
          <Route
            path="employee-management/salary"
            element={<EmployeeManagementSalaryPage />}
          />
          <Route path="event-dashboar" element={<EventDash />} />
          {/* event report generation */}
          {/* event registration */}

          {/* set daily rates */}
          {/* bookings */}

          {/* adoption management */}
          {/* display adoptions */}

          {/* inventory dashboard */}
          {/* inventory items */}
          {/* request stocks */}

          {/* expense */}
          {/* income */}
          {/* expense */}

          {/* supllier dashboard */}
          {/* manage suppliers */}
          {/* stock requests */}

          {/* feedback dashboard */}
        </Route>

        {/* Supplier Management Routes
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="supplier-management"
            element={<EmployeeManagementAdminPage />}
          />
          <Route
            path="employee-management/employees"
            element={<EmployeeManagementEmployeesAdminPage />}
          />
          <Route
            path="employee-management/roles"
            element={<EmployeeManagementRolesAdminPage />}
          />
          <Route
            path="employee-management/salary"
            element={<EmployeeManagementSalaryPage />}
          />
        </Route> */}
        
      </Routes>
    </BrowserRouter>
  );
}
