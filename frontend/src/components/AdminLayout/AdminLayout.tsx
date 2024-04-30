import ProtectedDiv from "../ProtectedDiv";
import Footer from "../Footer/Footer";
import AdminSidebar from "./AdimnSidebar";
import { Outlet } from "react-router-dom";
import AdminTopbar from "./AdminTopbar";

interface Props {
  className?: string;
}

export default function AdminLayout({ className }: Props) {
  return (
    <ProtectedDiv className={className}>
      <AdminTopbar />

      <div className="flex min-h-screen">
        <AdminSidebar />
        <Outlet />
      </div>

    </ProtectedDiv>
  );
}
