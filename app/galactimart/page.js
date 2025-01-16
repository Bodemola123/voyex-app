"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/galatimart-page/Header";
import Card1 from "../../components/galatimart-page/Card1";
import BenFooter from "@/components/common/BenFooter";
import BenNavbar from "@/components/common/BenNavbar";
import '../../app/globals.css'
import Visible from "@/components/galatimart-page/Visible";

function GalactiMart() {
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
    <div className="flex flex-row items-center w-full h-screen">
      <BenNavbar
        toggleHistoryVisibility={toggleHistoryVisibility}
        isHistoryVisible={isHistoryVisible}
      />
        <div
        className={`transition-all duration-300 ${
          isHistoryVisible ? 'w-[320px]' : 'w-0'
        } bg-[#131314] overflow-hidden`}
      >
        {isHistoryVisible && <Visible />}
        </div>
      <div className="flex-grow relative flex h-full w-full flex-col gap-10 p-6 justify-between items-center overflow-y-scroll scrollbar-hide scroll-container ">
        <Header/>
        <Card1/>
        <BenFooter/>
      </div>
    </div>
  );
}

export default GalactiMart;
