import { Link } from "react-router-dom";
import Logo from "../assets/UBLogo.png";
import ProfilePhoto from "./ProfilePhoto";

export default function Navbar() {
  return (
    <nav className="bg-secondary px-4 flex items-center justify-between w-full sticky z-10">
      <img src={Logo} alt="Urban Coop logo" />

      <ul
        className="text-white font-jockey-one-regular text-2xl 
        flex gap-12 absolute left-1/2 -translate-x-1/2"
      >
        <li className="text-primary">Home</li>
<<<<<<< HEAD
        <Link to="/petdaycare">
        <li>Pet Daycare</li>
        </Link>
        <Link to="/events"><li>Events</li>
        </Link>
        
        <li>Pet Adoptation</li>

=======
        <li>Services</li>
        <Link to="/pets">
        <li>Find a Pet</li>
        </Link>
>>>>>>> cfc6e7c402f2004a64ff94d4027117a434e929fe
        <Link to="/feedback">
          <li>Feeback</li>
        </Link>
        <li>About Us</li>
      </ul>

      <ProfilePhoto />
    </nav>
  );
}
