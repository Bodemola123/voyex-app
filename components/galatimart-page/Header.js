import {
  FiSearch,
  FiFilter,
  FiGrid,
  FiPower,
  FiVolume2,
  FiDownload,
} from "react-icons/fi";
import {
  HiOutlineBolt,
  HiOutlineSpeakerWave,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { TbFilter } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { GrTag } from "react-icons/gr";

const Header = () => {
  return (
    <div className="flex flex-col gap-y-6 w-full">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2 w-[681px] h-20">
          <h1 className="text-4xl font-bold">GalactiMart</h1>
          <p>
            Where the cosmic meets the artificial, offering a stellar selection
            of AI companions tailored to your interstellar adventures
          </p>
        </div>
        <div className="h-10 flex flex-row">
          <div className="relative  w-[198px]">
            <FiSearch className="absolute top-2 left-2 w-6 h-6 text-white" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 bg-transparent rounded-3xl border border-card outline-none focus:ring-0 focus:border-card w-48 text-white placeholder-white"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="h-8 w-52 flex flex-row gap-4 mt-4">
          <button className="w-28 h-8 rounded-3xl gap-3 text-sm flex justify-center items-center bg-[#131314]">
            {" "}
            <FaRegStar /> Featured
          </button>
          <button className="h-8 w-20 rounded-3xl  gap-3 text-sm flex justify-center items-center bg-[#131314]">
            {" "}
            <HiOutlineBolt /> New
          </button>
        </div>
        <div className="w-72 h-8 flex flex-row gap-2">
          <button className="w-24 h-8 gap-3 text-sm rounded-3xl flex justify-center items-center bg-[#131314]">
            {" "}
            <TbFilter /> Filter
          </button>
          <button className="w-24 h-8 gap-3 text-sm rounded-3xl flex justify-center items-center bg-[#131314]">
            {" "}
            <GrTag className="transform scale-x-[-1]" /> Price
          </button>
          <button className="w-24 h-8 gap-3  text-sm rounded-3xl flex justify-center items-center bg-[#131314]">
            {" "}
            <HiOutlineSquares2X2 /> View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
