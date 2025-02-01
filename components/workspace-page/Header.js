import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import { GoChevronLeft, GoPlus } from "react-icons/go";
import { HiOutlineDownload } from "react-icons/hi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

function Header ({openModal}) {
  return (
    <div className="flex items-center justify-between w-full z-10">
      <div className="flex items-center gap-2">
        <h3 className="text-4xl text-fontlight font-bold capitalize">
          Models
        </h3>
      </div>
      <div className="flex items-center gap-2 text-xl">
        <button onClick={openModal} className="py-2 px-4 rounded-[27px] flex flex-row gap-2.5 bg-[#c088fb] text-[#0a0a0b] hover:scale-105">
        <GoPlus className="text-[24px]"/>
        <p className="text-base ">Add new Model</p>
        </button>
      </div>
    </div>
  );
}

export default Header;
