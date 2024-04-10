import Logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="bg-secondary px-4 flex items-center justify-between w-full sticky z-10">
      <img src={Logo} alt="Urban Coop logo" />

      <ul
        className="text-white font-jockey-one-regular text-2xl 
        flex gap-12 absolute left-1/2 -translate-x-1/2"
      >
        <li className="text-primary">Home</li>
        <li>Services</li>
        <li>Feeback</li>
        <li>About Us</li>
      </ul>

      <div
        className="text-white font-bold text-xl bg-gray1 w-12 h-12 
        flex justify-center items-center rounded-full border-2 border-primary"
      >
        <span>Z</span>
      </div>
    </nav>
  );
}
