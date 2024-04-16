import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import EventPage from "./pages/EventManagement/EventPage";
import EventCreationForm from "./pages/EventManagement/EventCreationForm";
import EmployeeManagementAdminPage from "./pages/EmployeeManagementAdminPage/EmployeeManagementAdminPage";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import Layout from "./components/Layout";
import EventDash from "./pages/EventManagement/EventDash";
import UpdateEvent from "./pages/EventManagement/UpdateEvent";
import EmployeeManagementEmployeesAdminPage from "./pages/EmployeeManagementAdminPage/EmployeeManagementEmployeesAdminPage";
import EmployeeManagementRolesAdminPage from "./pages/EmployeeManagementAdminPage/EmployeeManagementRolesPage";
import EmployeeManagementSalaryPage from "./pages/EmployeeManagementAdminPage/EmployeeManagementSalaryPage";
//import PetDaycareBookingPage from "./pages/PetDaycareBookingPage";
import EventRegistrationPage from "./pages/EventManagement/EventRegistrationPage"



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="log-in" element={<LogInPage />} />
          <Route path="events" element={<EventPage />} />
          <Route path="events/register" element={<EventRegistrationPage/>} />
         
          
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
          <Route path="event-dashboard" 
          element={<EventDash />} />

          <Route path="event-dashboard/addEvent" 
          element={<EventCreationForm />} />

          <Route path="event-dashboard/uptadeEvent" 
          element={< UpdateEvent/>} />
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
<<<<<<< Updated upstream

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
        
=======
        

>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}
