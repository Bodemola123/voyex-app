import React from "react";
import { IoIosTrendingUp } from "react-icons/io";
import { useEffect, useRef } from "react";

const TrendingModal = ({ trendingSearches, onClose, onQueryClick }) => {
  const modalRef = useRef(null);

  // To close modal when user click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="flex flex-col bg-[#31313140] backdrop-blur-[6.8px] p-6 rounded-lg lg:w-[90%] max-w-[800px] h-[42vh] max-h-[80vh] w-[65%] transform translate-x-[110px]"
        ref={modalRef}
      >
        <h2 className="text-2xl font-bold mb-4">Trending</h2>
        <div className="flex-grow overflow-y-auto">
          <ul className="flex flex-row flex-wrap gap-3 pl-2 pt-1 pb-1">
            {trendingSearches.map((search, index) => (
              <div
                key={index}
                className="bg-transparent bg-opacity-50 border-[1px] hover:scale-105 hover:shadow-lg rounded border-slate-500 shadow-sm shadow-slate-500 transform transition-all duration-150 ease-in-out"
              >
                <li
                  className="p-2 flex flex-row gap-2 cursor-pointer"
                  onClick={() => onQueryClick(search)}
                >
                  <IoIosTrendingUp className="text-xl pt-1" />
                  {search}
                </li>
              </div>
            ))}
          </ul>
        </div>
        <div className="mt-4 pt-5">
          <button
            className="lg:absolute lg:bottom-4 lg:right-4 flex items-center justify-center p-2 bg-red-600 text-white rounded lg:w-[10%] w-[15%]"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingModal;
