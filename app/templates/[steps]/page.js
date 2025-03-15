"use client"
import BenNavbar from '@/components/common/BenNavbar';
import StepsNavOpen from '@/components/templates-page/StepsNavOpen';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Main from './main';

const Page = () => {
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
    <div className="flex flex-row items-center w-screen h-screen">
      <BenNavbar
        toggleHistoryVisibility={toggleHistoryVisibility}
        isHistoryVisible={isHistoryVisible}
      />
      <div
        className={`transition-all duration-300 ${
          isHistoryVisible ? "w-[360px]" : "w-0"
        } bg-[#131314] overflow-hidden`}
      >
        {isHistoryVisible && <StepsNavOpen />}
      </div>
        <div className="flex-grow relative flex h-full w-full flex-col gap-10 p-6 justify-start items-center overflow-y-scroll scrollbar-hide scroll-container">
            <Main/>
        </div>
        </div>
  )
}

export default Page