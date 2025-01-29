"use client";
import BenNavbar from "@/components/common/BenNavbar";
import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import SearchNavOpen from "@/components/search-page/SearchNavOpen";

function SearchLayout({ children }) {
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  // On component mount, retrieve state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("isHistoryVisible");
    if (savedState !== null) {
      setIsHistoryVisible(JSON.parse(savedState)); // Parse boolean value from localStorage
    }
  }, []);

  // Update localStorage whenever the state changes
  const toggleHistoryVisibility = () => {
    setIsHistoryVisible((prev) => {
      const newState = !prev;
      localStorage.setItem("isHistoryVisible", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <div className="flex items-center w-full h-screen">
      {/* Navbar */}
      <BenNavbar
        toggleHistoryVisibility={toggleHistoryVisibility}
        isHistoryVisible={isHistoryVisible}
      />

      {/* History with Smooth Transition */}
      <div
        className={`transition-all duration-300 ${
          isHistoryVisible ? "w-[360px]" : "w-0"
        } bg-[#131314] overflow-hidden`}
      >
        {isHistoryVisible && <SearchNavOpen />}
      </div>
      <main className="flex-grow relative flex h-full w-full flex-col gap-10 p-10 justify-between items-center overflow-y-scroll scrollbar-hide scroll-container">
        {children}
      </main>
    </div>
  );
}

export default SearchLayout;
