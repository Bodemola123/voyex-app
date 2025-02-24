"use client"

import BenNavbar from "@/components/common/BenNavbar";
import TemplateAside from "@/components/templates-page/TemplateAside";
import TemplatesCollapsible from "@/components/templates-page/TemplatesCollapsible";
import TemplatesNav from "@/components/templates-page/TemplatesNav";
import React, { useEffect, useState } from "react";

export default function TemplateLayout({ children }) {
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
        {isHistoryVisible && <TemplatesCollapsible />}
      </div>
      <div className="relative flex-grow w-full h-full p-6 overflow-y-scroll scrollbar-hide flex flex-col justify-between gap-4 tracking-wide">
        {children}
      </div>
    </div>
  );
}
