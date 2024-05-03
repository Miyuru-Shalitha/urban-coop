import AdminSidebar from "./AdimnSidebar";
import { Outlet } from "react-router-dom";
import AdminTopbar from "./AdminTopbar";
import ProtectedEmployeeDiv from "../ProtectedEmployeeDiv";

interface Props {
  className?: string;
}

export default function AdminLayout({ className }: Props) {
  return (
    <ProtectedEmployeeDiv className={className}>
      <AdminTopbar />

      <div className="flex min-h-screen">
        <AdminSidebar />
        <Outlet />
      </div>
    </ProtectedEmployeeDiv>
  );
}
