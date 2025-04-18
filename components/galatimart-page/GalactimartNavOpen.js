"use client";
import React from 'react';
import Image from 'next/image';
import { IoCube } from "react-icons/io5";

const GalactimartNavOpen = ({ categories = [], selectedCategory, onCategorySelect, isLoading }) => {
  return (
    <nav className="flex flex-col w-full bg-[#131314] h-screen pt-6">
      <div className="flex px-6 gap-4 flex-row items-center">
        <Image src={'/Crown.svg'} alt='crown' width={32} height={32} />
        <p className="font-extrabold text-3xl text-[#f4f4f4]">Voyex</p>
      </div>

      <div className="flex flex-row py-5 px-6 gap-2.5 mt-5">
        <IoCube className="text-[#ffffff] text-[24px]" />
        <p className="text-[20px] font-bold">Categories</p>
      </div>

      <div className="flex flex-col px-2 gap-2 overflow-y-scroll scrollbar-hide scroll-container">
        {/* Add "All" button */}
        <button
          className={`flex gap-2.5 py-3 px-6 text-left transition-all duration-200 ${
            selectedCategory === null ? "bg-[#1D1F20]" : "hover:bg-[#1D1F20]"
          } text-white`}
          onClick={() => onCategorySelect(null)} // Set selectedCategory to null
        >
          All
        </button>

        {isLoading ? (
          <p className="text-white text-center">Loading Categories...</p>
        ) : (
          categories.map((cat) => (
            <button
              key={cat}
              className={`flex gap-2.5 py-3 px-6 text-left transition-all duration-200 ${
                selectedCategory === cat ? "bg-[#1D1F20]" : "hover:bg-[#1D1F20]"
              } text-white`}
              onClick={() => onCategorySelect(cat)} // Select a category
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))
        )}
      </div>
    </nav>
  );
};

export default GalactimartNavOpen;
