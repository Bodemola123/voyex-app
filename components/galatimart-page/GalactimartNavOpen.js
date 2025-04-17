'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoCube } from "react-icons/io5";
import axios from 'axios';
import '../../app/globals.css';

const GalactimartNavOpen = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://2zztcz7h0a.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tools_api");
        const categoryKeys = Object.keys(response.data.data); // Extract the category names
        setCategories(categoryKeys); // Set categories dynamically
        setLoading(false); // Set loading to false once categories are fetched
      } catch (error) {
        console.error("Error fetching categories", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="flex flex-col w-full bg-[#131314] h-screen pt-6">
      <div className="flex px-6 gap-4 flex-row items-center">
        <Image src={'/Crown.svg'} alt="crown" width={32} height={32} />
        <p className="font-extrabold text-3xl text-[#f4f4f4]">Voyex</p>
      </div>
      <div className="flex flex-row py-5 px-6 gap-2.5 mt-5">
        <IoCube className="text-[#ffffff] text-[24px]" />
        <p className="text-[20px] font-bold">Categories</p>
      </div>
      <div className="flex flex-col px-2 gap-2 overflow-y-scroll scrollbar-hide scroll-container">
        {loading ? (
          <div className="text-white text-center py-5">Loading categories...</div>
        ) : (
          <>
            {/* All button to reset filter */}
            <button
              className="flex gap-2.5 py-3 px-6 hover:bg-[#1D1F20]"
              onClick={() => onCategorySelect(null)} // Pass null to reset filter
            >
              All
            </button>

            {/* Dynamically generated category buttons */}
            {categories.map((category, index) => (
              <button
                key={index}
                className="flex gap-2.5 py-3 px-6 hover:bg-[#1D1F20]"
                onClick={() => onCategorySelect(category)} // Pass selected category
              >
                {category.charAt(0).toUpperCase() + category.slice(1)} {/* Capitalize first letter */}
              </button>
            ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default GalactimartNavOpen;
