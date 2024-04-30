import { useEffect, useState } from "react";
import Slide1BackgroundImage from "../../assets/header_slide_1_background.png";
import HeaderSlide from "./HeaderSlide";

export default function Header() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  useEffect(() => {
    if (slideIndex > prevIndex) {
      console.log("RIGHT");
    } else if (slideIndex < prevIndex) {
      console.log("LEFT");
    }

    setPrevIndex(slideIndex);
  }, [slideIndex]);

  const getClassNames = (index: number): string => {
    return "";
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {[0, 12].map((slide, index) => (
        <HeaderSlide
          key={index}
          className={getClassNames(index)}
          backgroundImageSrc={Slide1BackgroundImage}
        />
      ))}

      {/* <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2
        flex gap-2"
      >
        <div
          className="bg-primary w-12 h-1.5 rounded cursor-pointer"
          onClick={() => setSlideIndex(0)}
        ></div>
        <div
          className="bg-gray1 w-8 h-1.5 rounded cursor-pointer"
          onClick={() => setSlideIndex(1)}
        ></div>
        <div
          className="bg-gray1 w-8 h-1.5 rounded cursor-pointer"
          onClick={() => setSlideIndex(2)}
        ></div>
        <div
          className="bg-gray1 w-8 h-1.5 rounded cursor-pointer"
          onClick={() => setSlideIndex(3)}
        ></div>
      </div> */}
    </div>
  );
}
