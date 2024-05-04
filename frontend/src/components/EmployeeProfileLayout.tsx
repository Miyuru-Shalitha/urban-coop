import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";
import AdminTopbar from "./AdminLayout/AdminTopbar";
import {
  EmployeeAuthContext,
  EmployeeContextType,
} from "../context/EmployeeAuthContextProvider";
import Cookies from "js-cookie";

interface BaseItem {
  onClick: (index: number) => void;
  name: string;
  route: string;
}

export default function EmployeeProfileLayout() {
  const [items, setItems] = useState<BaseItem[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const context = useContext<EmployeeContextType | null>(EmployeeAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!context?.employeeCredential.employeeId) {
      navigate("/admin/login");
    }

    setItems([
      {
        onClick: (index) => setActiveItemIndex(index),
        name: "Info",
        route: "/admin/profile",
      },
      {
        onClick: (index) => setActiveItemIndex(index),
        name: "Attendance / Salary",
        route: "/admin/profile/attendance",
      },
      {
        onClick: (index) => () => {
          handleClickLogOut();
          setActiveItemIndex(index);
        },
        name: "Log Out",
        route: "/admin/login",
      },
    ]);
  }, []);

  const handleClickLogOut = () => {
    Cookies.remove("employee");
    Cookies.remove("token");
    context?.setEmployeeCredential({
      _id: "",
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      role: "",
    });
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="bg-surface">
      <AdminTopbar />

      <div className="h-screen flex overflow-auto">
        <div className="w-72 h-full p-4">
          <ul className="bg-white h-full p-4 rounded flex flex-col gap-1">
            {items.map((item, index) => (
              <SidebarItem
                key={item.name}
                itemIndex={index}
                activeItemIndex={activeItemIndex}
                {...item}
              />
            ))}
          </ul>
        </div>

        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

interface Item extends BaseItem {
  itemIndex: number;
  activeItemIndex: number;
}

function SidebarItem({
  name,
  itemIndex,
  activeItemIndex,
  route,
  onClick,
}: Item) {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick(itemIndex);
    navigate(route);
  };

  return (
    <li
      className={`${
        itemIndex === activeItemIndex ? "bg-primary" : "bg-gray2"
      } text-white px-4 py-2 rounded cursor-pointer hover:bg-primaryAccent transition-colors`}
      onClick={handleClick}
    >
      {name}
    </li>
  );
}
