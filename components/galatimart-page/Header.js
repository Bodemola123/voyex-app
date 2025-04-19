"use client";
import { useEffect, useRef, useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineBolt, HiOutlineSquares2X2 } from "react-icons/hi2";
import { GrTag } from "react-icons/gr";

const Header = ({
  searchQuery,
  onSearchChange,
  priceFilter,
  onPriceFilterChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <div className="relative w-[198px]">
            <FiSearch className="absolute top-2 left-2 w-6 h-6 text-white" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={onSearchChange}
              className="pl-10 pr-4 py-2 bg-transparent rounded-3xl border border-card outline-none focus:ring-0 focus:border-card w-48 text-white placeholder-white"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="h-8 w-52 flex flex-row gap-4 mt-4">
          <button className="w-28 h-8 rounded-3xl gap-3 text-sm flex justify-center items-center bg-[#131314]">
            <FaRegStar /> Featured
          </button>
          <button className="h-8 w-20 rounded-3xl gap-3 text-sm flex justify-center items-center bg-[#131314]">
            <HiOutlineBolt /> New
          </button>
        </div>
        <div className="w-72 h-8 flex flex-row gap-2">
          <button className="w-24 h-8 gap-3 text-sm rounded-3xl flex justify-center items-center bg-[#131314]">
            <FiFilter /> Filter
          </button>

          {/* Price filter button and dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className={`w-24 h-8 gap-3 text-sm rounded-3xl flex justify-center items-center transition-all ${
                isDropdownOpen
                  ? "bg-[#f4f4f4] text-[#0a0a0b]"
                  : "bg-[#131314] text-white hover:bg-[#f4f4f4] hover:text-[#0a0a0b]"
              }`}
            >
              <GrTag className="transform scale-x-[-1]" /> Price
            </button>

            {isDropdownOpen && (
              <div className="absolute mt-2 bg-[#1c1d1f] p-2 rounded-[8px] flex flex-col gap-2 text-[#f4f4f4] z-50 w-full">
                {["All", "Free", "Paid"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      onPriceFilterChange(option);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm cursor-pointer hover:bg-[#f4f4f4] hover:text-[#1c1d1f] rounded-[8px] ${
                      priceFilter === option
                        ? ""
                        : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="w-24 h-8 gap-3 text-sm rounded-3xl flex justify-center items-center bg-[#131314]">
            <HiOutlineSquares2X2 /> View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
