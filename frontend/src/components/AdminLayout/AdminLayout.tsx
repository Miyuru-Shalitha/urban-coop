import ProtectedDiv from "../ProtectedDiv";
import Footer from "../Footer/Footer";
import Logo from "../../assets/logo.png";
import AdminSidebar from "./AdimnSidebar";
import { Outlet } from "react-router-dom";
import ProfilePhoto from "../ProfilePhoto";

interface Props {
  className?: string;
}

export default function AdminLayout({ className }: Props) {
  return (
    <ProtectedDiv className={className}>
      <div className="bg-secondary flex justify-between items-center px-4">
        <img src={Logo} alt="" />

        <ProfilePhoto />
      </div>

      <div className="flex min-h-screen">
        <AdminSidebar />
        <Outlet />
      </div>

      <Footer />
    </ProtectedDiv>
  );
}
