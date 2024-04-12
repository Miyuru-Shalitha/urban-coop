import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import EventPage from "./pages/EventPage";
import EventCreationForm from "./pages/EventCreationForm";
import EmployeeManagementAdminPage from "./pages/EmployeeManagementAdminPage";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import Layout from "./components/Layout";

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
        </Route>

        {/* Employee Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<EmployeeManagementAdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
