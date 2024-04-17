import { useEffect, useState } from "react";
import ProtectedDiv from "../components/ProtectedDiv";

interface BaseItem {
  name: string;
  route: string;
}

export default function UserProfilePage() {
  const [items, setItems] = useState<BaseItem[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState(-1);

  useEffect(() => {
    setItems([
      {
        name: "Item 1",
        route: "userprofile",
      },
      {
        name: "Item 2",
        route: "userprofile/#",
      },
      {
        name: "Item 3",
        route: "userprofile/#",
      },
    ]);
  }, []);

  return (
    <ProtectedDiv className="flex h-screen bg-surface">
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

      <div className="flex-1">CONTENT</div>
    </ProtectedDiv>
  );
}

interface Item extends BaseItem {
  itemIndex: number;
  activeItemIndex: number;
}

function SidebarItem({ name, itemIndex, activeItemIndex }: Item) {
  return (
    <li
      className={`${
        itemIndex === activeItemIndex ? "bg-gray0" : "bg-gray2"
      } text-white px-4 py-2 rounded cursor-pointer`}
      // onClick={}
    >
      {name}
    </li>
  );
}
