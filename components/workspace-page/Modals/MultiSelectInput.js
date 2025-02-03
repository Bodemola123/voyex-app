"use client";

import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// List of available categories
const availableCategories = [
  "Chatbot",
  "Research",
  "Writing",
  "Sales",
  "Models",
  "Energy",
  "Finance"
];

const MultiSelectInput = ({ selectedCategories, setSelectedCategories }) => {
  const [open, setOpen] = useState(false); // State to manage dropdown open/close

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    if (Array.isArray(selectedCategories) && selectedCategories.length < 4 && !selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]); // Update parent state
    }
  };

  // Function to handle category removal
  const handleCategoryRemove = (e, category) => {
    e.stopPropagation();
    setSelectedCategories(selectedCategories.filter((c) => c !== category)); // Update parent state
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        className="w-full justify-between rounded-[28px] bg-card/30 hover:bg-card/30 border-none text-fontlight/80 hover:text-fontlight h-[56px]"
      >
        {Array.isArray(selectedCategories) && selectedCategories.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <div
                key={category}
                className="flex items-center gap-2 bg-[#C088FB33] text-[#c088fb] text-sm font-bold px-3 py-1 rounded-full"
              >
                {category}
                <button
                  onClick={(e) => handleCategoryRemove(e, category)}
                  className="text-white text-lg"
                  aria-label={`Remove ${category}`}
                >
                  <AiOutlineClose />
                </button>
              </div>
            ))}
          </div>
        ) : (
          "Select categories..."
        )}
        <FaCaretDown
          className={cn(
            "opacity-50 transition-transform duration-200",
            open && "rotate-180" // Rotate the caret when the dropdown is open
          )}
        />
      </Button>

      {open && (
        <div className="absolute mt-2 w-full bg-black text-fontlight p-3 border-none max-h-[208px] overflow-y-scroll rounded-lg shadow-lg z-10">
          <div className="mt-2 ml-2">
            <p>You can add only up to 4 categories</p>
          </div>
          <ul className="mt-3">
            {availableCategories.map((category) => (
              <li
                key={category}
                role="option"
                aria-selected={selectedCategories.includes(category) ? "true" : "false"}
                className={cn(
                  "p-2 cursor-pointer hover:bg-purple",
                  selectedCategories.includes(category) && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => handleCategorySelect(category)}
                disabled={selectedCategories.length === 4 && !selectedCategories.includes(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectInput;