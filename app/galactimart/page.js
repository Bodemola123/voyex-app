"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/galatimart-page/Header";
import Card1 from "../../components/galatimart-page/Card1";
import BenFooter from "@/components/common/BenFooter";
import BenNavbar from "@/components/common/BenNavbar";
import "../../app/globals.css";
import GalactimartNavOpen from "@/components/galatimart-page/GalactimartNavOpen";
import axios from "axios";

function GalactiMart() {
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [toolsData, setToolsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // On component mount, retrieve state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("isHistoryVisible");
    if (savedState !== null) {
      setIsHistoryVisible(JSON.parse(savedState)); // Parse boolean value from localStorage
    }

    const fetchToolsData = async () => {
      try {
        const response = await axios.get(
          "https://2zztcz7h0a.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tools_api"
        );
        setToolsData(response.data);
      } catch (error) {
        console.error("Error fetching tools data", error);
      }
    };

    fetchToolsData();
  }, []);

  // Function to filter tools based on selected category
  const filterTools = () => {
    if (!selectedCategory) return toolsData; // If no category selected, return all tools
    return toolsData[selectedCategory] || []; // Return tools for selected category
  };

  const toggleHistoryVisibility = () => {
    setIsHistoryVisible((prev) => {
      const newState = !prev;
      localStorage.setItem("isHistoryVisible", JSON.stringify(newState));
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
          isHistoryVisible ? "w-[300px]" : "w-0"
        } bg-[#131314] overflow-hidden`}
      >
        {isHistoryVisible && <GalactimartNavOpen onCategorySelect={setSelectedCategory} />}
      </div>
      <div className="flex-grow relative flex h-full w-full flex-col gap-10 p-6 justify-between items-center overflow-y-scroll scrollbar-hide scroll-container ">
        <Header />
        <Card1 tools={filterTools()} selectedCategory={selectedCategory} /> {/* Pass filtered tools to Card1 */}
        <BenFooter />
      </div>
    </div>
  );
}

export default GalactiMart;
