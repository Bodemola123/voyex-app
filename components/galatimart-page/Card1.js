"use client";
import React from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";


const Card1 = ({ toolsData, categories, selectedCategory, isLoading, error, recommendedTools }) => {
  if (error) {
    return (
      <div className="text-red-500 p-4 bg-[#1c1d1f] rounded-lg text-center">
        Failed to fetch Tools, Please try again later
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-64 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C088FB]"></div>
      </div>
    );
  }


  // Group filtered tools by category
  const toolsByCategory = categories.reduce((acc, category) => {
    const toolsInCategory = toolsData
      .filter((tool) => tool.category === category)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    if (toolsInCategory.length > 0) {
      acc[category] = toolsInCategory;
    }
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-12">
      {/* ⭐ TOP RECOMMENDATIONS FOR YOU */}
      {recommendedTools && recommendedTools.length > 0 && (
  <div className="flex flex-col gap-4">
    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex gap-2 flex-col w-full">
        <h1 className="text-2xl font-bold capitalize">⭐ Top Recommendations for You</h1>
        <p>
          Handpicked galactic gems tailored for your journey across the stars. 
          These are the top tools we think you&apos;ll love!
        </p>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4 w-full">
      {recommendedTools.map((tool) => (
        <ProductCard
          key={tool.tool_id}
          product={{
            id: tool.tool_id,
            title: tool.tool_name,
            image: tool.icon,
            rating: tool.rating,
            description: tool.large_description,
            tags: tool.use_case_tags,
            sponsored:tool.sponsored
          }}
        />
      ))}
    </div>
  </div>
)}


      {/* Tools by Category */}
      {Object.entries(toolsByCategory).map(([category, tools]) => {
        if (selectedCategory && category !== selectedCategory) return null;

        const toolsToDisplay = tools.slice(0, 6);

        return (
          <div key={category} className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex gap-2 flex-col w-full">
                <h1 className="text-2xl font-bold capitalize">{category}</h1>
                <p>
                  A stellar selection of tools tailored to your interstellar adventures in {category}.
                </p>
              </div>
              <div className="w-[100px]">
                <Link
                  href={`/galactimart/${category}`}
                  passHref
                  className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C088FB] via-[#8E3EFF] to-[#8E3EFF] flex items-center gap-2"
                >
                  See More
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full">
              {toolsToDisplay.map((tool) => (
                <ProductCard
                  key={tool.tool_id}
                  product={{
                    id: tool.tool_id,
                    title: tool.tool_name,
                    image: tool.icon,
                    rating: tool.rating,
                    description: tool.large_description,
                    tags: tool.use_case_tags,
                    sponsored: tool.sponsored
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card1;
