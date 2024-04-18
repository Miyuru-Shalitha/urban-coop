import ProfilePhoto from "./ProfilePhoto";
import Logo from "../assets/logo.png";

export default function AdminTopbar() {
  return (
    <div className="bg-secondary flex justify-between items-center px-4">
      <img src={Logo} alt="" />
      <ProfilePhoto />
    </div>
  );
}
