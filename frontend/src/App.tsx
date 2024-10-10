import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/UserLoginPage/RegisterPage";
import UserLoginPage from "./pages/UserLoginPage/LoginPage";
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
import SupplierManagementStockReq from "./pages/SupplierManagementAdminPage/SupplierManagementStockReq";
import SupplierManagementUpdateSupplierPage from "./pages/SupplierManagementAdminPage/SupplierManagementUpdateSupplierPage";
import SupplierManagementCreateSupplierPage from "./pages/SupplierManagementAdminPage/SupplierManagementCreateSupplierPage";
import SupplierManagementSupplierPage from "./pages/SupplierManagementAdminPage/SupplierManagementSupplierPage";


import InventoryManagementPage from "./pages/InventoryManagementAdminPage/InventoryManagementAdminPage";
import InventoryManagementDashboard from "./pages/InventoryManagementAdminPage/InventoryManagementDashboard";
import InventoryManagementItemPage from "./pages/InventoryManagementAdminPage/InventoryManagementItemPage";
import InventoryManagementRequestStocksPage from "./pages/InventoryManagementAdminPage/InventoryManagementRequestStocksPage";
import InventoryManagementCreateItemsPage from "./pages/InventoryManagementAdminPage/InventoryManagementCreateItemsPage";
import InventoryManagementCreateRequest from "./pages/InventoryManagementAdminPage/InventoryManagementCreateRequest";
import EventRegistrationPage from "./pages/EventManagementPage/EventRegistrationPage";
import EventReport from "./pages/EventManagementPage/EventReport";
//import FeedbackManagementAdminPage from "./pages/FeedbackManagementAdminPage/FeedbackManagementAdminPage";
import EmployeeProfilePage from "./pages/EmployeeProfilePage";

//Pet Daycare Management Pages
import PetDaycareBookingPage from "./pages/PetDaycareManagementPage/PetDaycareBookingPage";
// Remove the duplicate import statement for 'PetDaycareMyBookings'
// import PetDaycareMyBookings from "./pages/PetDaycareManagementAdminPage/PetDaycareMyBookings";

import PetDaycareMyBookings from "./pages/PetDaycareManagementPage/PetDaycareMyBookings";
import PetDaycareBookingUpdatePage from "./pages/PetDaycareManagementPage/PetDaycareBookingUpdatePage";
import BookingTable from "./pages/PetDaycareManagementAdminPage/BookingTable";
import PetDaycareDashboard from "./pages/PetDaycareManagementAdminPage/PetDaycareDashboard";

import UpdateRegistrationForm from "./pages/EventManagementPage/updateUserRegistration";

import Userdash from "./pages/EventManagementPage/UserRegistrationForEventPage";
import EmployeeProfileLayout from "./components/EmployeeProfileLayout";
import EmployeeLogInPage from "./pages/EmployeeLogInPage";
import InventoryManagementUpdatePage from "./pages/InventoryManagementAdminPage/InventoryManagementUpdatePage";
import InventoryReport from "./pages/InventoryManagementAdminPage/InventoryReport";

import CreateFeedbackPage from "./pages/FeedbackManagement/CreateFeedbackPage";
import MyFeedbackPage from "./pages/FeedbackManagement/MyFeedbackPage";
import FeedbackTable from "./pages/FeedbackManagement/FeedbackTable";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}

        <Route path="/login" element={<UserLoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />

          <Route path="events" element={<EventPage />} />
          <Route
            path="events/register/:id"
            element={<EventRegistrationPage />}
          />

          <Route path="events" element={<EventPage />} />
          <Route path="events/register/:id" element={<EventRegistrationPage />} />

          <Route path="petdaycare" element={<PetDaycareBookingPage />} />
          <Route path="mybookings" element={<PetDaycareMyBookings />} />
          <Route path="mybookings/update/:id" element={<PetDaycareBookingUpdatePage />} />
          <Route path="up" element={<PetDaycareBookingUpdatePage />} />

          <Route path="feedback" element={<CreateFeedbackPage/>}/>
          <Route path="myfeedback" element={<MyFeedbackPage/>}/>

          <Route path="petdaycare" element={<PetDaycareBookingPage />} />
          <Route path="mybookings" element={<PetDaycareMyBookings />} />
          <Route
            path="mybookings/update/:id"
            element={<PetDaycareBookingUpdatePage />}
          />
          <Route path="up" element={<PetDaycareBookingUpdatePage />} />
        </Route>

        {/* Employee Log In Page */}
        <Route path="/admin/login" element={<EmployeeLogInPage />} />

        {/* Employee Profile Routes */}
        <Route path="/admin/profile" element={<EmployeeProfileLayout />}>
          <Route path="" element={<EmployeeProfilePage />} />
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
            path="inventory-management/item/item-update/:id"
            element={<InventoryManagementUpdatePage />}
          />


          <Route
            path="inventory-management/request-stocks"
            element={<InventoryManagementRequestStocksPage />}
          />
          <Route
            path="inventory-management/request-create"
            element={<InventoryManagementCreateRequest />}
          />
          <Route
            path="inventory-management/report"
            element={<InventoryReport />}
          />
          

          {/* Event Management Routes */}
          <Route path="event-dashboard" element={<EventDash />} />

          <Route
            path="event-dashboard/addEvent"
            element={<EventCreationForm />}
          />

          <Route path="event-dashboard/uptadeEvent" element={<UpdateEvent />} />

          <Route
            path="event-dashboard/uptadeEvent/:id"
            element={<UpdateEvent />}
          />

          <Route path="user-registerdashboard" element={<Userdash />} />

          <Route
            path="user-registerdashboard/updateRegistration/:id"
            element={<UpdateRegistrationForm />}
          />

          <Route path="report-generation" element={<EventReport />} />
          {/* event report generation */}

          <Route path="allbookings" element={<BookingTable />} />
          <Route path="bookingsOverview" element={<PetDaycareDashboard />} />

          {/* set daily rates */}
          {/* bookings */}

          {/* adoption management */}
          {/* display adoptions */}

          {/* expense */}
          {/* income */}
          {/* expense */}






          {/* Supplier Management Routes */}
          <Route
            path="supplier-management"
            element={<SupplierManagementAdminPage />}
          />

          <Route
            path="supplier-management/supplier-dashboard"
            element={<SupplierManagementDashboard />}
          />

          <Route
            path="supplier-management/suppliers"
            element={<SupplierManagementSupplierPage />}
          />

          <Route
            path="supplier-management/create-suppliers"
            element={<SupplierManagementCreateSupplierPage />}
          />

          {/* <Route
            path="supplier-management/update-suppliers"
            element={<SupplierManagementUpdateSupplierPage />}
          /> */}

          <Route
            path="supplier-management/suppliers/update/:id"
            element={<SupplierManagementUpdateSupplierPage />}
          />



          <Route
            path="supplier-management/stock-requests"
            element={<SupplierManagementStockReq />}
          />
        

          <Route
            path="supplier-management/allsup/:id"
            element={<SupplierManagementUpdateSupplierPage />}
          />


          {/* 
          <Route 
            path="supplier-management/allsup/:id"
            element={<SupplierManagementUpdateSupplierPage />} /> 
          */}
          

          {/* feedback dashboard */}
          <Route
            path="feedbacks"
            element={<FeedbackTable />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
