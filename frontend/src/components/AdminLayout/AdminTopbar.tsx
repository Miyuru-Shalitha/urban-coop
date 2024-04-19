import ProfilePhoto from "../ProfilePhoto";
import Logo from "../../assets/logo.png";
import { ReactNode } from "react";
import { Link, To } from "react-router-dom";

export default function AdminTopbar() {
  return (
    <div className="bg-secondary flex justify-between items-center px-4">
      <img src={Logo} alt="" />

      <div className="relative">
        <ProfilePhoto />

        <DropDown />
      </div>
    </div>
  );
}

function DropDown() {
  return (
    <ul
      className="bg-white absolute top-14 right-0 w-48
                  rounded border-2 flex flex-col last:border-b-0"
    >
      <DropDownItem to="/admin/profile">Profile</DropDownItem>
      <DropDownItem to="/admin/logout">Log Out</DropDownItem>
    </ul>
  );
}

function DropDownItem({ children, to }: { children: ReactNode; to: To }) {
  return (
    <Link to={to}>
      <li className="px-4 py-2 border-b-2 hover:bg-primaryAccent cursor-pointer transition-colors">
        {children}
      </li>
    </Link>
  );
}
