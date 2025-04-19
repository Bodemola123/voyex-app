'use client'
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header1 from "./Header1";
import Card from "./Card";
import BenFooter from "@/components/common/BenFooter";
import BenNavbar from "@/components/common/BenNavbar";
import GalactimartNavOpen from "@/components/galatimart-page/GalactimartNavOpen";
import axios from "axios";
import '../../../app/globals.css';

const CategoryPage = () => {
  const { category } = useParams(); // Get the dynamic category from the URL
  const [toolsData, setToolsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch tools when component mounts
  useEffect(() => {
    const fetchTools = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://2zztcz7h0a.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tools_api"
        );
        const rawData = response.data.data;
        const parsedTools = [];

        const allSections = Object.keys(rawData);
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
            });
          });
        });

        setToolsData(parsedTools);
        setCategories(allSections);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch tools:", error);
        setIsLoading(false);
      }
    };

    fetchTools();
  }, []);

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
        className={`transition-all duration-300 ${
          isHistoryVisible ? "w-[320px]" : "w-0"
        } bg-[#131314] overflow-hidden`}
      >
        {isHistoryVisible && (
          <GalactimartNavOpen
            categories={categories}
            selectedCategory={category}
            // onCategorySelect={() => {}} // optional if not selecting from here
          />
        )}
      </div>

      <div className="flex-grow relative flex h-full w-full flex-col gap-4 p-6 justify-between items-center overflow-y-scroll scrollbar-hide scroll-container ">
        <Header1 />
        <Card
          category={category}
          toolsData={toolsData}
          isLoading={isLoading}
        />
        <BenFooter />
      </div>
    </div>
  );
};

export default CategoryPage;
