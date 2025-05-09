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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [error, setError] = useState(null); // State for error
  const [recommendedToolsBase, setRecommendedToolsBase] = useState([]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setIsLoading(true);
        setError(null); // Reset error on new fetch
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
              category: section,
              created_at: tool.created_at,
            });
          });
        });

        setCategories(allSections);
        setToolsData(parsedTools);
            // Set 6 random tools only once after fetching
    const shuffled = [...parsedTools].sort(() => 0.5 - Math.random());
    setRecommendedToolsBase(shuffled.slice(0, 6));
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch tools:", error);
        setIsLoading(false);
        setError("Failed to load tools. Please try again later."); // Set error message
      }
    };

    fetchTools();
  }, []);

  const [sortByNew, setSortByNew] = useState(false);

  const filteredTools = toolsData
    .filter((tool) => {
      if (selectedCategory && tool.category !== selectedCategory) return false;
      if (searchQuery && !tool.tool_name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (priceFilter === "Free" && tool.pricing_model !== "Freemium") return false;
      if (priceFilter === "Paid" && tool.pricing_model !== "Paid") return false;

      if (ratingFilter !== "All") {
        const ratingRange = {
          1: [0.0, 1.99],
          2: [2.0, 2.99],
          3: [3.0, 3.99],
          4: [4.0, 4.99],
          5: [5.0, 5.0],
        };
        const [min, max] = ratingRange[ratingFilter];
        if (tool.rating < min || tool.rating > max) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortByNew) {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return 0;
    });

    const filteredRecommendedTools = recommendedToolsBase.filter((tool) => {
      if (selectedCategory && tool.category !== selectedCategory) return false;
      if (searchQuery && !tool.tool_name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (priceFilter === "Free" && tool.pricing_model !== "Freemium") return false;
      if (priceFilter === "Paid" && tool.pricing_model !== "Paid") return false;
    
      if (ratingFilter !== "All") {
        const ratingRange = {
          1: [0.0, 1.99],
          2: [2.0, 2.99],
          3: [3.0, 3.99],
          4: [4.0, 4.99],
          5: [5.0, 5.0],
        };
        const [min, max] = ratingRange[ratingFilter];
        if (tool.rating < min || tool.rating > max) return false;
      }
    
      return true;
    });
    
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePriceFilterChange = (value) => {
    setPriceFilter(value);
  };

  const handleRatingFilterChange = (value) => {
    setRatingFilter(value);
  };

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
            onCategorySelect={handleCategoryChange}
            isLoading={isLoading}
            error={error} // Pass error to GalactimartNavOpen
          />
        )}
      </div>
      <div className="flex-grow relative flex h-full w-full flex-col gap-10 p-6 items-center overflow-y-scroll scrollbar-hide scroll-container">
        <Header
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          priceFilter={priceFilter}
          onPriceFilterChange={handlePriceFilterChange}
          sortByNew={sortByNew}
          setSortByNew={setSortByNew}
          ratingFilter={ratingFilter}
          setRatingFilter={handleRatingFilterChange}
        />
        <div className="w-full">
          <Card1
            recommendedTools={filteredRecommendedTools}
            toolsData={filteredTools}
            categories={categories}
            selectedCategory={selectedCategory}
            isLoading={isLoading}
            error={error} // Pass error to Card1
          />
        </div>
      </div>
    </div>
  );
}

export default GalactiMart;
