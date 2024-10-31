import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import { GoChevronLeft } from "react-icons/go";
import { HiOutlineDownload } from "react-icons/hi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

function Header() {
  return (
    <div className="flex items-center justify-between w-full z-10">
      <div className="flex items-center gap-2">
        <button className="flex items-center justify-center px-4 py-1 border border-fontfaded rounded-xl">
          <GoChevronLeft className="text-2xl" />
        </button>
        <h3 className="text-3xl text-fontlight font-bold capitalize">
          workspace
        </h3>
      </div>
      <div className="flex items-center gap-2 text-xl">
        <div className="relative flex items-center max-w-[150px] pl-7 h-8 rounded-2xl border border-white/30">
          <RiSearch2Line className="absolute top-1/2 left-2 -translate-y-1/2" />
          <input
            className="text-sm text-fontlight placeholder:text-sm placeholder:text-fontlight bg-transparent px-2 outline-none w-full"
            placeholder="Search"
          />
        </div>
        <button className="p-2">
          <HiOutlineSpeakerWave />
        </button>
        <button className="p-2">
          <HiOutlineDownload />
        </button>
      </div>
    </div>
  );
}

export default Header;
