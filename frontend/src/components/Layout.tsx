import Navbar from "./Navbar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

interface Props {
  className?: string;
}

export default function Layout({ className = "" }: Props) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
