'use client'
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header1 from "./Header1";
import Card from "./Card";
import BenFooter from "@/components/common/BenFooter";
import BenNavbar from "@/components/common/BenNavbar";
import axios from "axios";
import '../../../app/globals.css';
import CategoryNavOpen from "./CategoryNavOpen";

const CategoryPage = () => {
  const { category } = useParams(); // Get the dynamic category from the URL
  const [toolsData, setToolsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [sortByNew, setSortByNew] = useState(false);
  const [error, setError] = useState(null); // State for error

  // Fetch tools when component mounts
  useEffect(() => {
    const fetchTools = async () => {
      try {
        setIsLoading(true);
        setError(null); // Reset error on new fetch
        const response = await axios.get(
          "https://2zztcz7h0a.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tools_api"
        );
        const rawData = response.data.data;
        const parsedTools = [];
        
        const allSections = Object.keys(rawData).sort();
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
              category: tool.category,
              created_at: tool.created_at,
            });
          });
        });

        setToolsData(parsedTools);
        setCategories(allSections);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch tools:", error);
        setIsLoading(false);
        setError("Failed to load tools. Please try again later."); // Set error message
      }
    };

    fetchTools();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle price filter change
  const handlePriceFilterChange = (value) => {
    setPriceFilter(value);
  };

  // Handle rating filter change
  const handleRatingFilterChange = (value) => {
    setRatingFilter(value);
  };

  // Filter tools based on selected filters
  const filteredTools = toolsData
    .filter((tool) => {
      if (category && tool.category !== category) return false;
      if (searchQuery && !tool.tool_name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (priceFilter === "Free" && tool.pricing_model !== "Freemium") return false;
      if (priceFilter === "Paid" && tool.pricing_model !== "Paid") return false;
      
      // Rating filter logic
      if (ratingFilter !== "All") {
        const ratingRange = {
          1: [0.0, 1.99],
          2: [2.0, 2.99],
          3: [3.0, 3.99],
          4: [4.0, 4.99],
          5: [5.0, 5.0]
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
      return 0; // keep current order if not sorting
    });

  // Handle toggle for history visibility
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
        className={`transition-all duration-300 ${isHistoryVisible ? "w-[360px]" : "w-0"} bg-[#131314] overflow-hidden`}
      >
        {isHistoryVisible && (
          <CategoryNavOpen
          categories={categories}
          selectedCategory={category}
          />
        )}
      </div>
      
      <div className="flex-grow relative flex h-full w-full flex-col gap-4 p-6 items-center overflow-y-scroll scrollbar-hide scroll-container">
        <Header1 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          priceFilter={priceFilter}
          onPriceFilterChange={handlePriceFilterChange}
          sortByNew={sortByNew}
          setSortByNew={setSortByNew}
          ratingFilter={ratingFilter}
          setRatingFilter={handleRatingFilterChange}
          category={category}
        />
        <div className="w-full">
        <Card
          category={category}
          toolsData={filteredTools}
          isLoading={isLoading}
          error={error}
        />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
