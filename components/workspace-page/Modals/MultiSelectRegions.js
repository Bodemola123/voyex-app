"use client";

import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// List of available regions
const availableRegions = [
"North America", "Europe", "Asia", "South America", "Africa", "Oceania"
];

const MultiSelectRegions = ({ selectedRegions, setSelectedRegions }) => {
  const [open, setOpen] = useState(false); // State to manage dropdown open/close

  // Function to handle regions selection
  const handleRegionChange = (regions) => {
    if (Array.isArray(selectedRegions) && selectedRegions.length < 4 && !selectedRegions.includes(regions)) {
      setSelectedRegions([...selectedRegions, regions]); // Update parent state
    }
  };

  // Function to handle regions removal
  const handleRegionRemove = (e, regions) => {
    e.stopPropagation();
    setSelectedRegions(selectedRegions.filter((c) => c !== regions)); // Update parent state
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        className="w-full justify-between rounded-[28px] bg-[#0A0A0B]  hover:bg-[#0A0A0B]  border-none text-fontlight/80 hover:text-fontlight h-[56px]"
      >
        {Array.isArray(selectedRegions) && selectedRegions.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedRegions.map((regions) => (
              <div
                key={regions}
                className="flex items-center gap-2 bg-[#C088FB33] text-[#c088fb] text-sm font-bold px-3 py-1 rounded-full"
              >
                {regions}
                <button
                  onClick={(e) => handleRegionRemove(e, regions)}
                  className="text-white text-lg"
                  aria-label={`Remove ${regions}`}
                >
                  <AiOutlineClose />
                </button>
              </div>
            ))}
          </div>
        ) : (
          "Select Regions..."
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
            <p>You can add only up to 4 regions</p>
          </div>
          <ul className="mt-3">
            {availableRegions.map((regions) => (
              <li
                key={regions}
                role="option"
                aria-selected={selectedRegions.includes(regions) ? "true" : "false"}
                className={cn(
                  "p-2 cursor-pointer hover:bg-[#131314]",
                  selectedRegions.includes(regions) && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => handleRegionChange(regions)}
                disabled={selectedRegions.length === 4 && !selectedRegions.includes(regions)}
              >
                {regions}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectRegions;