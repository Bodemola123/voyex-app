"use client";

import BenFooter from "@/components/common/BenFooter";
import BenNavbar from "@/components/common/BenNavbar";
import Footer from "@/components/common/Footer";
import HomeDiv from "@/components/home-page/HomeDiv";
import HomeNavbar from "@/components/home-page/HomeNavbar";
import SearchNavOpen from "@/components/search-page/SearchNavOpen";
import SearchPageContainer from "@/components/search-page/SearchPageContainer";
import { useEffect, useState } from "react";

export default function Home() {
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
        <section className="relative flex flex-col gap-4 items-center justify-center h-full w-full mx-auto">
          <SearchPageContainer />
          <BenFooter />
        </section>
      </main>
    </div>
  );
}
