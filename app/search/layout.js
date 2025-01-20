'use client'
import BenFooter from "@/components/common/BenFooter";
import BenNavbar from "@/components/common/BenNavbar";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import History from "@/components/search-page/History";
import React, { useEffect, useState } from "react";
import '../../app/globals.css'


function SearchLayout({ children }) {

  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  // On component mount, retrieve state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('isHistoryVisible');
    if (savedState !== null) {
      setIsHistoryVisible(JSON.parse(savedState)); // Parse boolean value from localStorage
    }
  }, []);

  // Update localStorage whenever the state changes
  const toggleHistoryVisibility = () => {
    setIsHistoryVisible((prev) => {
      const newState = !prev;
      localStorage.setItem('isHistoryVisible', JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <div className="flex items-center w-full h-screen bg-black bg-[url('/stars.svg.svg')] bg-cover bg-no-repeat bg-fixed bg-center">
      {/* Navbar */}
      <BenNavbar
        toggleHistoryVisibility={toggleHistoryVisibility}
        isHistoryVisible={isHistoryVisible}
      />

      {/* History with Smooth Transition */}
      <div
        className={`transition-all duration-300 ${
          isHistoryVisible ? 'w-[360px]' : 'w-0'
        } bg-[#131314] overflow-hidden`}
      >
        {isHistoryVisible && <History />}
      </div>
      <main className="flex-grow relative flex h-full w-full flex-col gap-10 p-10 justify-between items-center overflow-y-scroll scrollbar-hide scroll-container">
        {children}
<<<<<<< HEAD
=======
        <BenFooter/>
>>>>>>> 1dff4b4134d03e9b999119aebf770a8df2c9029c
      </main>
    </div>
  );
}

export default SearchLayout;
