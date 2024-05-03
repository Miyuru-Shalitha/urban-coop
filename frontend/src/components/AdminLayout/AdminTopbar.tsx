import ProfilePhoto from "../ProfilePhoto";
import Logo from "../../assets/UBLogo.png";
import { MouseEventHandler, ReactNode } from "react";
import { Link, To } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/employeeAuthSlice";

export default function AdminTopbar() {
  return (
    <div className="bg-secondary flex justify-between items-center px-4">
      <img src={Logo} alt="" />

      <div className="relative group">
        <ProfilePhoto />

        <DropDown />
      </div>
    </div>
  );
}

function DropDown() {
  const dispatch = useDispatch();

  const handleClickLogOut = () => {
    dispatch(logOut(null));
  };

  return (
    <ul
      className="bg-white absolute top-14 right-0 w-48
                  rounded border-2 hidden group-hover:flex flex-col last:border-b-0"
    >
      <DropDownItem to="/admin/profile">Profile</DropDownItem>
      <DropDownItem to={null} onClick={handleClickLogOut}>
        Log Out
      </DropDownItem>
    </ul>
  );
}

function DropDownItem({
  children,
  to,
  onClick,
}: {
  children: ReactNode;
  to: To | null;
  onClick?: MouseEventHandler<HTMLLIElement> | undefined;
}) {
  return (
    <>
      {to ? (
        <Link to={to}>
          <li className="px-4 py-2 border-b-2 hover:bg-primaryAccent cursor-pointer transition-colors">
            {children}
          </li>
        </Link>
      ) : (
        <li
          className="px-4 py-2 border-b-2 hover:bg-primaryAccent cursor-pointer transition-colors"
          onClick={onClick}
        >
          {children}
        </li>
      )}
    </>
  );
}
