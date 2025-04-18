"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/galatimart-page/Header";
import BenFooter from "@/components/common/BenFooter";
import BenNavbar from "@/components/common/BenNavbar";
import GalactimartNavOpen from "@/components/galatimart-page/GalactimartNavOpen";
import Card1 from "../../components/galatimart-page/Card1";

function GalactiMart() {
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toolsData, setToolsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Initially, no category selected
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [priceFilter, setPriceFilter] = useState("All"); // Price filter state

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://2zztcz7h0a.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tools_api"
        );
        const rawData = response.data.data;
        const allSections = Object.keys(rawData);
        const parsedTools = [];

        allSections.forEach((section) => {
          rawData[section].forEach((tool) => {
            parsedTools.push({
              tool_id: tool.tool_id,
              tool_name: tool.tool_name,
              large_description: tool.large_description,
              icon: tool.tool_assets_metadata?.icon,
              rating: tool.rating,
              pricing_model: tool.pricing_model,
              special_tags: tool.special_tags,
              use_case_tags: tool.use_case_tags,
              category: section, // Keep category for filtering
            });
          });
        });

        setCategories(allSections); // All sections are the categories
        setToolsData(parsedTools);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch tools:", error);
        setIsLoading(false);
      }
    };

    fetchTools();
  }, []);

  // Filter tools by category, search query, and price
  const filteredTools = toolsData.filter((tool) => {
    // Filter by category if a category is selected
    if (selectedCategory && tool.category !== selectedCategory) return false;
    
    // Filter by search query
    if (searchQuery && !tool.tool_name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    // Filter by price filter
    if (priceFilter === "Free" && tool.pricing_model !== "Freemium") return false;
    if (priceFilter === "Paid" && tool.pricing_model !== "Paid") return false;

    return true;
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // Set the selected category
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle price filter change
  const handlePriceFilterChange = (value) => {
    setPriceFilter(value);
  };
  

  // Retrieve sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("isHistoryVisible");
    if (savedState !== null) {
      setIsHistoryVisible(JSON.parse(savedState));
    }
  }, []);

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
        className={`transition-all duration-300 ${isHistoryVisible ? "w-[300px]" : "w-0"} bg-[#131314] overflow-hidden`}
      >
        {isHistoryVisible && (
          <GalactimartNavOpen
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategoryChange} // Pass handler to change category
            isLoading={isLoading}
          />
        )}
      </div>
      <div className="flex-grow relative flex h-full w-full flex-col gap-10 p-6 items-center overflow-y-scroll scrollbar-hide scroll-container">
        <Header
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          priceFilter={priceFilter}
          onPriceFilterChange={handlePriceFilterChange}
        />
        <div className="w-full">
          <Card1
            toolsData={filteredTools}
            categories={categories}
            selectedCategory={selectedCategory}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default GalactiMart;
