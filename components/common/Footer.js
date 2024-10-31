import React from "react";
import { IoIosArrowDown } from "react-icons/io";

function Footer() {
  return (
    <div className="absolute bottom-[2vh] left-[50vw] -translate-x-[50vw] w-full z-1">
      <div className="flex items-center justify-center gap-[1vw] text-[2vh] text-fontlight font-normal bg-card/30 backdrop-blur-[6.8px] w-[32vw] h-[7vh] rounded-lg mx-auto">
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

export default Footer;
