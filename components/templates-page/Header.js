import React, { useRef, useState, useEffect } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { HiOutlineBolt, HiOutlineSquares2X2 } from 'react-icons/hi2';
import Advert1 from './Advert1';

const Header = ({
  searchTerm,
  setSearchTerm,
  ratingFilter,
  setRatingFilter,
  sortByNewest,
  setSortByNewest,
}) => {
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
  const ratingDropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ratingDropdownRef.current && !ratingDropdownRef.current.contains(event.target)) {
        setIsRatingDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-4xl">Templates</h1>
        <div className="relative w-[198px] h-10 flex">
          <FiSearch className="absolute top-2 left-2 text-white w-6 h-6" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-transparent rounded-3xl border border-card w-48 text-white placeholder-white outline-none focus:ring-0 focus:border-card"
          />
        </div>
      </div>

      <Advert1 />

      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          <button className='w-28 h-8 rounded-3xl gap-3 text-sm flex justify-center items-center bg-[#131314] border border-[#FFFFFF26]'>
            <FaRegStar /> Featured
          </button>
          <button
            onClick={() => setSortByNewest((prev) => !prev)}
            className={`h-8 w-20 rounded-3xl gap-3 text-sm flex justify-center items-center border border-[#FFFFFF26] transition-all ${
              sortByNewest ? 'bg-[#f4f4f4] text-[#0a0a0b]' : 'bg-[#131314] text-white hover:bg-[#f4f4f4] hover:text-[#0a0a0b]'
            }`}
          >
            <HiOutlineBolt /> New
          </button>
        </div>

        {/* Rating filter dropdown */}
        <div className="relative" ref={ratingDropdownRef}>
          <button
            onClick={() => setIsRatingDropdownOpen((prev) => !prev)}
            className={`w-24 h-8 gap-3 text-sm rounded-3xl flex justify-center items-center transition-all border border-[#FFFFFF26] ${
              isRatingDropdownOpen ? 'bg-[#f4f4f4] text-[#0a0a0b]' : 'bg-[#131314] text-white hover:bg-[#f4f4f4] hover:text-[#0a0a0b]'
            }`}
          >
            <HiOutlineSquares2X2 /> Rating
          </button>

          {isRatingDropdownOpen && (
            <div className="absolute mt-2 bg-[#1c1d1f] p-2 rounded-[8px] flex flex-col gap-2 text-[#f4f4f4] z-50 w-max">
              <div
                className="flex gap-1 items-center p-2 cursor-pointer hover:bg-[#131314] rounded-[8px]"
                onClick={() => setRatingFilter(null)}
              >
                <span>All</span>
              </div>
              <div className="flex gap-1 items-center p-1 cursor-pointer rounded-[8px]">
                {Array.from({ length: 5 }, (_, i) => {
                  const isFilled = ratingFilter && i < ratingFilter;
                  return (
                    <span key={i} onClick={() => setRatingFilter(i + 1)}>
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
      </div>
    </div>
  );
};

export default Header;
