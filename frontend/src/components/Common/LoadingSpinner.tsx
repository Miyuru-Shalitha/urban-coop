import React from "react";
import spinner from "../../assets/spin.gif";

const Spinner = () => {
  return (
    <div className="w-full pl-auto flex justify-center items-center h-full">
      <img className="h-[150px] m-[200px]" src={spinner} alt="" />
    </div>
  );
};

export default Spinner;