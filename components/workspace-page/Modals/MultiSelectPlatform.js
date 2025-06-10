"use client";

import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// List of available platforms
const availablePlatforms = [
"Web", "Android", "iOS", "API", "Desktop"
];

const MultiSelectPlatform = ({ selectedPlatforms, setSelectedPlatforms }) => {
  const [open, setOpen] = useState(false); // State to manage dropdown open/close

  // Function to handle platforms selection
  const handlePlatformChange = (platforms) => {
    if (Array.isArray(selectedPlatforms) && selectedPlatforms.length < 4 && !selectedPlatforms.includes(platforms)) {
      setSelectedPlatforms([...selectedPlatforms, platforms]); // Update parent state
    }
  };

  // Function to handle platforms removal
  const handlePlatformRemove = (e, platforms) => {
    e.stopPropagation();
    setSelectedPlatforms(selectedPlatforms.filter((c) => c !== platforms)); // Update parent state
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        className="w-full justify-between rounded-[28px] bg-[#0A0A0B]  hover:bg-[#0A0A0B]  border-none text-fontlight/80 hover:text-fontlight h-[56px]"
      >
        {Array.isArray(selectedPlatforms) && selectedPlatforms.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedPlatforms.map((platforms) => (
              <div
                key={platforms}
                className="flex items-center gap-2 bg-[#C088FB33] text-[#c088fb] text-sm font-bold px-3 py-1 rounded-full"
              >
                {platforms}
                <button
                  onClick={(e) => handlePlatformRemove(e, platforms)}
                  className="text-white text-lg"
                  aria-label={`Remove ${platforms}`}
                >
                  <AiOutlineClose />
                </button>
              </div>
            ))}
          </div>
        ) : (
          "Select Platforms..."
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
            <p>You can add only up to 4 platforms</p>
          </div>
          <ul className="mt-3">
            {availablePlatforms.map((platforms) => (
              <li
                key={platforms}
                role="option"
                aria-selected={selectedPlatforms.includes(platforms) ? "true" : "false"}
                className={cn(
                  "p-2 cursor-pointer hover:bg-[#131314]",
                  selectedPlatforms.includes(platforms) && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => handlePlatformChange(platforms)}
                disabled={selectedPlatforms.length === 4 && !selectedPlatforms.includes(platforms)}
              >
                {platforms}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectPlatform;