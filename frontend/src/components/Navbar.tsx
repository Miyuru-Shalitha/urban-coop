import { NavLink } from "react-router-dom"; // Use NavLink instead of Link
import Logo from "../assets/UBLogo.png";
import ProfilePhoto from "./ProfilePhoto";

export default function Navbar() {
  return (
    <nav className="bg-secondary px-4 flex items-center justify-between w-full sticky z-10">
      <img src={Logo} alt="Urban Coop logo" />

      <ul className="text-white font-jockey-one-regular text-2xl flex gap-12 absolute left-1/2 -translate-x-1/2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'text-primary' : ''}`
          }
        >
          <li>Home</li>
        </NavLink>
        <NavLink
          to="/petdaycare"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'text-primary' : ''}`
          }
        >
          <li>Pet Daycare</li>
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'text-primary' : ''}`
          }
        >
          <li>Events</li>
        </NavLink>
        <NavLink
          to="/pet-adoption"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'text-primary' : ''}`
          }
        >
          <li>Pet Adoption</li>
        </NavLink>
        <NavLink
          to="/feedback"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'text-primary' : ''}`
          }
        >
          <li>Feedback</li>
        </NavLink>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'text-primary' : ''}`
          }
        >
          <li>About Us</li>
        </NavLink>
      </ul>

      <ProfilePhoto />
    </nav>
  );
}
