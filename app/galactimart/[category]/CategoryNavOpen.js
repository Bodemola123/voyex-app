"use client";
import React from 'react';
import Image from 'next/image';
import { IoCube } from "react-icons/io5";
import { MdErrorOutline } from 'react-icons/md';

const CategoryNavOpen = ({ categories = [], selectedCategory, isLoading, error }) => {

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-[#1c1d1f] rounded-lg text-center flex flex-col">
        <MdErrorOutline className='text-5xl text-red-500'/>
        Failed to fetch Categories, Please try again later
      </div>
    );
  }
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
        {isLoading ? (
          <p className="text-white text-center my-auto">Loading Categories...</p>
        ) : (
          categories.map((cat) => (
            <div
              key={cat}
              className={`flex gap-2.5 py-3 px-6 text-left transition-all duration-200 cursor-default ${
                selectedCategory === cat ? "bg-[#1D1F20]" : ""
              } text-white`}
            //   onClick={() => onCategorySelect(cat)} // Select a category
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </div>
          ))
        )}
      </div>
    </nav>
  );
};

export default CategoryNavOpen;
