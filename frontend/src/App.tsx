import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import EventPage from "./pages/EventManagementPage/EventPage";
import EventCreationForm from "./pages/EventManagementPage/EventCreationPage";
import EmployeeManagementAdminPage from "./pages/EmployeeManagementAdminPage/EmployeeManagementAdminPage";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import Layout from "./components/Layout";
import EventDash from "./pages/EventManagementPage/EventAdminPage";
import UpdateEvent from "./pages/EventManagementPage/UpdateEventPage";
import EmployeeManagementEmployeesAdminPage from "./pages/EmployeeManagementAdminPage/EmployeeManagementEmployeesAdminPage";
import EmployeeManagementRolesAdminPage from "./pages/EmployeeManagementAdminPage/EmployeeManagementRolesPage";
import EmployeeManagementSalaryPage from "./pages/EmployeeManagementAdminPage/EmployeeManagementSalaryPage";
import SupplierManagementAdminPage from "./pages/SupplierManagementAdminPage/SupplierManagementAdminPage";
import SupplierManagementDashboard from "./pages/SupplierManagementAdminPage/SupplierManagementDashboard";
import SupplierManagementManagePage from "./pages/SupplierManagementAdminPage/SupplierManagementManagePage";
import SupplierManagementStockReq from "./pages/SupplierManagementAdminPage/SupplierManagementStockReq";
import InventoryManagementPage from "./pages/InventoryManagementAdminPage/InventoryManagementAdminPage";
import InventoryManagementDashboard from "./pages/InventoryManagementAdminPage/InventoryManagementDashboard";
import InventoryManagementItemPage from "./pages/InventoryManagementAdminPage/InventoryManagementItemPage";
import InventoryManagementRequestStocksPage from "./pages/InventoryManagementAdminPage/InventoryManagementRequestStocksPage";
import EventRegistrationPage from "./pages/EventManagementPage/EventRegistrationPage"
import FeedbackManagementAdminPage from "./pages/FeedbackManagementAdminPage/FeedbackManagementAdminPage";
import EmployeeProfilePage from "./pages/EmployeeProfilePage";
import PetDaycareBookingPage from "./pages/PetDaycareManagementPage/PetDaycareBookingPage";
import PetDaycareMyBookings from "./pages/PetDaycareManagementAdminPage/PetDaycareMyBookings";
import InventoryManagementCreateItemsPage from "./pages/InventoryManagementAdminPage/InventoryManagementCreateItemsPage";
import InventoryManagementUpdateItems from "./pages/InventoryManagementAdminPage/InventoryManagementUpdateItems";
import InventoryManagementCreateRequest from "./pages/InventoryManagementAdminPage/InventoryManagementCreateRequest";

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
          
          <Route path="events/register" element={<EventRegistrationPage/>} /> 
          <Route path="petdaycare" element={<PetDaycareBookingPage/>} />       
          <Route path="mybookings" element={<PetDaycareMyBookings/>} />

        </Route>

        {/* Management Routes */}
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
          
          <Route path="profile" element={<EmployeeProfilePage />} />

          <Route path="event-dashboard" element={<EventDash />} />

          {/* Inventory Routes */}
          <Route
            path="inventory-management"
            element={<InventoryManagementPage />}
          />
          <Route
            path="inventory-management/dashboard"
            element={<InventoryManagementDashboard />}
          />
          <Route
            path="inventory-management/item"
            element={<InventoryManagementItemPage />}
          />
          <Route
            path="inventory-management/item-create"
            element={<InventoryManagementCreateItemsPage />}
          />
          <Route
            path="inventory-management/item-update"
            element={<InventoryManagementUpdateItems />}
          />
         
          <Route
            path="inventory-management/request-stocks"
            element={<InventoryManagementRequestStocksPage />}
          />
          <Route
            path="inventory-management/request-create"
            element={<InventoryManagementCreateRequest />}
          />
          
          



          
          {/* Event Management Routes */}
          <Route path="event-dashboard" element={<EventDash />} />

          <Route
            path="event-dashboard/addEvent"
            element={<EventCreationForm />}
          />

          <Route path="event-dashboard/uptadeEvent" 
          element={< UpdateEvent/>} />

          {/* event report generation */}


          {/* set daily rates */}
          {/* bookings */}

          {/* adoption management */}
          {/* display adoptions */}

       

          {/* expense */}
          {/* income */}
          {/* expense */}
          
          {/* Supplier Management Routes */}
          <Route
            path = "supplier-management"
            element = {<SupplierManagementAdminPage />}
          />

          <Route
            path = "supplier-management/supplier-dashboard"
            element = {<SupplierManagementDashboard />}
          />

          <Route
            path = "supplier-management/manage-suppliers"
            element = {<SupplierManagementManagePage />}
          />

          <Route
            path = "supplier-management/stock-requests"
            element = {<SupplierManagementStockReq />}
          />

          {/* feedback dashboard */}
          <Route
            path="feedback-dashboard"
            element={<FeedbackManagementAdminPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}