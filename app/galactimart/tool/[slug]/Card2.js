"use client";
import React from "react";
import "./CardsSection.css";
import ProductCard from "./ProductCard1";

const Card2 = ({ relatedTools }) => {
  return (
    <div className="flex-row cards-wrapper h-full pb-6">
      {relatedTools?.map((tool) => (
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
  );
};

export default Card2;
