import { useEffect, useState } from "react";
import ProtectedDiv from "../components/ProtectedDiv";
import { Outlet, useNavigate } from "react-router-dom";

interface BaseItem {
  onClick: (index: number) => void;
  name: string;
  route: string;
}

export default function UserProfileLayout() {
  const [items, setItems] = useState<BaseItem[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState(-1);

  useEffect(() => {
    setItems([
      {
        onClick: (index) => setActiveItemIndex(index),
        name: "My Bookings",
        route: "/userprofile/mybookings",
      },
      {
        onClick: (index) => setActiveItemIndex(index),
        name: "TEST",
        route: "/userprofile/test-2",
      },
    ]);
  }, []);

  return (
    <ProtectedDiv className="flex bg-surface">
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
    </ProtectedDiv>
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
    navigate(route);
    onClick(itemIndex);
  };

  return (
    <li
      className={`${
        itemIndex === activeItemIndex ? "bg-gray0" : "bg-gray2"
      } text-white px-4 py-2 rounded cursor-pointer`}
      onClick={handleClick}
    >
      {name}
    </li>
  );
}
