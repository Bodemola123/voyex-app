"use client"
import BenNavbar from "@/components/common/BenNavbar";
import Card from "@/components/templates-page/Card";
import Header from "@/components/templates-page/Header";
import TemplatesCollapsible from "@/components/templates-page/TemplatesCollapsible";
import React, { useEffect, useState } from "react";


function Templates() {
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
  const [selectedProduct, setSelectedProduct] = useState(null);

  return ( 
  <div className="flex flex-row items-center w-screen h-screen">
  <BenNavbar
    toggleHistoryVisibility={toggleHistoryVisibility}
    isHistoryVisible={isHistoryVisible}
  />
  <div
    className={`transition-all duration-300 ${
      isHistoryVisible ? "w-[266px]" : "w-0"
    } bg-[#131314] overflow-hidden`}
  >
    {isHistoryVisible && <TemplatesCollapsible />}
  </div>
    <div className="flex-grow relative flex h-full w-full flex-col gap-10 p-6 items-center overflow-y-scroll scrollbar-hide scroll-container">
    <Header/>
    <div className="w-full">
      <Card selectedProduct={selectedProduct}
      setSelectedProduct={setSelectedProduct}/>
    </div>
  </div>
  </div>
  );
}

export default Templates;




