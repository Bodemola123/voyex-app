"use client";
import BenFooter from "@/components/common/BenFooter";
import BenNavbar from "@/components/common/BenNavbar";
import WorkSpaceHeader from "@/components/workspace-page/Header";
import NavOpen from "@/components/workspace-page/NavOpen";
import React, { useEffect, useState } from "react";

function WorkSpaceLayout({ children }) {
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
        {isHistoryVisible && <NavOpen />}
      </div>
      <div className="relative flex-grow w-full h-full py-5 px-11 overflow-y-scroll flex flex-col justify-between gap-4 tracking-wide">
        <div className="flex flex-col">
          <WorkSpaceHeader />
          {children}
        </div>
        <BenFooter />
      </div>
    </div>
  );
}

export default WorkSpaceLayout;
