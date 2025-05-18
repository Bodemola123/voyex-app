"use client";
import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { FaRegStar, FaStar } from "react-icons/fa";
import { HiOutlineBolt, HiOutlineSquares2X2 } from "react-icons/hi2";
import { GrTag } from "react-icons/gr";
import Link from 'next/link';
import { MdKeyboardArrowLeft } from "react-icons/md";
import Advert from "@/components/galatimart-page/Advert";

const Header1 = ({
  searchQuery,
  onSearchChange,
  priceFilter,
  onPriceFilterChange,
  sortByNew,
  setSortByNew,
  ratingFilter,
  setRatingFilter,
  category
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const ratingDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        ratingDropdownRef.current && !ratingDropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
        setIsRatingDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row justify-between">
        <div className='flex flex-row w-[697px] gap-4'>
          <Link href={`/galactimart`} passHref>
            <button className='w-[48px] h-[32px] border border-card gap-2.5 flex items-center justify-center rounded-lg'>
              <MdKeyboardArrowLeft className='text-white text-[24px]' />
            </button>
          </Link>
          <div className="flex flex-col gap-2 w-[681px]">
            <h1 className="text-4xl font-bold capitalize">{`${category}`}</h1>
            <p>
              Discover the latest and most exciting tools from {category} category.
            </p>
          </div>
        </div>
        <div className='h-10 flex'>
          <div className='relative w-[198px]'>
            <FiSearch className="absolute top-2 left-2 text-white w-6 h-6 " />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={onSearchChange}
              className="pl-10 pr-4 py-2 bg-transparent rounded-3xl border border-card w-48 text-white placeholder-white outline-none focus:ring-0 focus:border-card"
            />
          </div>
        </div>
      </div>
      <Advert/>
      <div className='flex flex-row justify-between'>
        <div className='h-8 w-52 flex flex-row gap-4 mt-4'>
          <button className='w-28 h-8 rounded-3xl gap-3 text-sm flex justify-center items-center bg-[#131314]'>
            <FaRegStar /> Featured
          </button>
          <button
            className={`h-8 w-20 rounded-3xl gap-3 text-sm flex justify-center items-center bg-[#131314] ${sortByNew ? "bg-[#f4f4f4] text-[#0a0a0b]" : "hover:bg-[#f4f4f4] hover:text-[#0a0a0b]"}`}
            onClick={() => setSortByNew((prev) => !prev)}
          >
            <HiOutlineBolt /> New
          </button>
        </div>
        <div className='w-72 h-8 flex flex-row gap-2'>
          {/* Rating filter dropdown */}
          <div className="relative" ref={ratingDropdownRef}>
            <button
              onClick={() => {
                setIsRatingDropdownOpen((prev) => !prev);
                setIsDropdownOpen(false); // Close price dropdown
              }}
              className={`w-24 h-8 gap-3 text-sm rounded-3xl flex justify-center items-center transition-all ${
                isRatingDropdownOpen ? "bg-[#f4f4f4] text-[#0a0a0b]" : "bg-[#131314] text-white hover:bg-[#f4f4f4] hover:text-[#0a0a0b]"
              }`}
            >
              <HiOutlineSquares2X2 /> Rating
            </button>

            {isRatingDropdownOpen && (
              <div className="absolute mt-2 bg-[#1c1d1f] p-2 rounded-[8px] flex flex-col gap-2 text-[#f4f4f4] z-50 w-max">
                <div
                  className="flex gap-1 items-center p-1 cursor-pointer hover:bg-[#f4f4f4] hover:text-[#1c1d1f] rounded-[8px]"
                  onClick={() => setRatingFilter("All")}
                >
                  <span>All</span>
                </div>
                <div className="flex gap-1 items-center p-1 cursor-pointer rounded-[8px]">
                  {Array.from({ length: 5 }, (_, i) => {
                    const isFilled = ratingFilter && i < ratingFilter;
                    return (
                      <span
                        key={i}
                        onClick={() => setRatingFilter(i + 1)}
                      >
                        {isFilled ? (
                          <FaStar className="text-[#FCD53F] text-base" />
                        ) : (
                          <FaRegStar className="text-[#FCD53F] text-base" />
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Price filter button and dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                setIsDropdownOpen((prev) => !prev);
                setIsRatingDropdownOpen(false); // Close rating dropdown
              }}
              className={`w-24 h-8 gap-3 text-sm rounded-3xl flex justify-center items-center transition-all ${
                isDropdownOpen ? "bg-[#f4f4f4] text-[#0a0a0b]" : "bg-[#131314] text-white hover:bg-[#f4f4f4] hover:text-[#0a0a0b]"
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
                      priceFilter === option ? "" : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* <button className="w-24 h-8 gap-3 text-sm rounded-3xl flex justify-center items-center bg-[#131314]">
            <HiOutlineSquares2X2 /> View
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Header1;
