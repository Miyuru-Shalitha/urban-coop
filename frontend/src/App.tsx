import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import EventPage from "./pages/EventPage";
import EventCreationForm from "./pages/EventCreationForm";
import EventDash from "./pages/EventDash";
import UpdateEvent from "./pages/UpdateEvent";


export default function App() {
  return (
    <BrowserRouter>
     <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/log-in" element={<LogInPage />} />
        <Route path="/Event" element={<EventPage />} />
        <Route path="/create" element={<EventCreationForm/>} />
        <Route path="/Eventdash" element={<EventDash/>} />
        <Route path="/Update" element={<UpdateEvent/>} />
        <Route path="/create" element={<EventCreationForm/>} />
      </Routes>
    </BrowserRouter>
  );
}
