import React from "react";
import { IoIosArrowDown } from "react-icons/io";

function FlexibleFooter() {
  return (
    <div className="flex items-center justify-center w-full z-1">
      <div className="flex items-center justify-center gap-6 text-base tracking-wider text-fontlight font-light bg-card/30 backdrop-blur-[6.8px] px-4 py-3 rounded-lg mx-auto">
        <button className="">Buy plan</button>
        <button className="">Advertise</button>
        <button className="">Resources</button>
        <button className="">About us</button>
        <button className="flex items-center gap-1">
          <span className="">English(UK)</span>
          <IoIosArrowDown className="text-[2vh]" />
        </button>
      </div>
    </div>
  );
}

export default FlexibleFooter;
