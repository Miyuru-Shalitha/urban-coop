import { useEffect, useState } from "react";
import Bullet from "../../assets/icons/bullet.svg";
import { useNavigate } from "react-router-dom";

interface Subtitle {
  name: string;
  route: string;
}

interface BaseItem {
  onClick: (index: number) => void;
  activeIndex: number;
  title: string;
  homeRoute: string;
  subtitles: Subtitle[];
}

export default function AdminSidebar() {
  const [items, setItems] = useState<BaseItem[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(-1);

  useEffect(() => {
    setItems([
      {
        onClick: (index) => setActiveItemIndex(index),
        activeIndex: activeItemIndex,
        title: "Event Management",
        homeRoute: "/admin/event-dashboard",
        subtitles: [
          {
            name: "User Registration",
            route: "/admin/user-registerdashboard",
          },
          {
            name: "Report Generation",
            route: "",
          },
        ],
      },
      {
        onClick: (index) => setActiveItemIndex(index),
        activeIndex: activeItemIndex,
        title: "Employee Management",
        homeRoute: "/admin/employee-management",
        subtitles: [
          {
            name: "Employees",
            route: "/admin/employee-management/employees",
          },
          {
            name: "Roles",
            route: "/admin/employee-management/roles",
          },
          // {
          //   name: "Salary",
          //   route: "/admin/employee-management/salary",
          // },
        ],
      },
      {
        onClick: (index) => setActiveItemIndex(index),
        activeIndex: activeItemIndex,
        title: "Inventory Management",
        homeRoute: "/admin/inventory-management",
        subtitles: [
          {
            name: "Dashboard",
            route: "/admin/inventory-management/dashboard",
          },
          {
            name: "Item",
            route: "/admin/inventory-management/item",
          },
          {
            name: "Request Stocks",
            route: "/admin/inventory-management/request-stocks",
          },
        ],
      },

      {
        onClick: (index) => setActiveItemIndex(index),
        activeIndex: activeItemIndex,
        title: "Supplier Management",
        homeRoute: "/admin/supplier-management",
        subtitles: [
          {
            name: "Dashboard",
            route: "/admin/supplier-management/supplier-dashboard",
          },
          {
            name: "Manage Suppliers",
            route: "/admin/supplier-management/manage-suppliers",
          },
          {
            name: "Stock Requests",
            route: "/admin/supplier-management/stock-requests",
          },
        ],
      },
      {
        onClick: (index) => setActiveItemIndex(index),
        activeIndex: activeItemIndex,
        title: "Feeback Management",
        homeRoute: "/admin/feedback-dashboard",
        subtitles: [
          {
            name: "Feedback",
            route: "/admin/feedback-dashboard",
          },
        ],
      },
    ]);
  }, [activeItemIndex]);

  return (
    <ul
      className="bg-secondary text-white 
        flex flex-col gap-px w-72"
    >
      {items.map((item, index) => (
        <SidebarItem key={index} index={index} {...item} />
      ))}

      <div className="bg-gray2 mt-auto py-2 px-4 cursor-pointer">Log Out</div>
    </ul>
  );
}

interface Item extends BaseItem {
  index: number;
}

function SidebarItem({
  index,
  activeIndex,
  onClick,
  title,
  homeRoute,
  subtitles,
}: Item) {
  const navigate = useNavigate();

  if (index === activeIndex) {
    return (
      <li
        className="flex flex-col gap-px"
        onClick={(event) => {
          onClick(-1);
          event.stopPropagation();
          navigate(homeRoute);
        }}
      >
        <p className="bg-primary text-secondary py-2 px-4 cursor-pointer flex gap-2">
          <img className="rotate-90" src={Bullet} alt="Dropdown icon" />
          <span>{title}</span>
        </p>

        <ul className="bg-secondary flex flex-col gap-px">
          {subtitles.map((subtitle, index) => (
            <li
              key={index}
              className="py-2 px-8 bg-gray1 hover:bg-gray0 transition-colors cursor-pointer flex items-center gap-2"
              onClick={(event) => {
                event.stopPropagation();
                navigate(subtitle.route);
              }}
            >
              {/* <img src={Bullet} alt="" /> */}
              <div className="size-2 bg-white rounded-full"></div>
              <span>{subtitle.name}</span>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li
      className="bg-gray2 px-4 py-2 cursor-pointer flex gap-2
        hover:bg-primaryAccent hover:text-secondary transition-colors"
      onClick={() => onClick(index)}
    >
      <img src={Bullet} alt="Dropdown icon" />
      <span>{title}</span>
    </li>
  );
}
