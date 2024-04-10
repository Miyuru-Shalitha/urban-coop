import Slide1BackgroundImage from "../assets/header_slide_1_background.png";

export default function Header() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <img
        src={Slide1BackgroundImage}
        alt=""
        className="absolute left-0 top-0"
      />
      <div className="bg-gradient-to-b from-blackA1 to-blackA2 absolute h-full w-full"></div>

      <div className="w-container absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className="w-72 flex flex-col text-white">
          <h1 className="text-6xl">Leading the Way to Pet Wellness</h1>
          <p className="text-xl mb-4">Our something your something</p>
          <button
            className="bg-primary active:bg-primaryAccent text-2xl py-1.5 px-8
             rounded-full self-start transition-colors"
          >
            Explore Now
          </button>
        </div>
      </div>

      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2
        flex gap-2"
      >
        <div className="bg-primary w-12 h-1.5 rounded"></div>
        <div className="bg-gray1 w-8 h-1.5 rounded"></div>
        <div className="bg-gray1 w-8 h-1.5 rounded"></div>
        <div className="bg-gray1 w-8 h-1.5 rounded"></div>
      </div>
    </div>
  );
}
