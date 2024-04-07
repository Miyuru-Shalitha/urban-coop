import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import EventPage from "./pages/EventPage";
import EventCreationForm from "./pages/EventCreationForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/log-in" element={<LogInPage />} />
        <Route path="/Event" element={<EventPage />} />
        <Route path="/create" element={<EventCreationForm />} />
      </Routes>
    </BrowserRouter>
  );
}
   