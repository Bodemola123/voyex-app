"use client";

import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { Check } from "lucide-react";
import { AiOutlineClose } from "react-icons/ai"; // New icon import for 'X'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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

const CategoryCombobox = ({ setSelectedCategories }) => {
  const [open, setOpen] = useState(false); // State to manage popover open/close
  const [selectedCategories, setLocalSelectedCategories] = useState([]); // State to manage selected categories

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    if (selectedCategories.length < 4 && !selectedCategories.includes(category)) {
      const updatedCategories = [...selectedCategories, category];
      setLocalSelectedCategories(updatedCategories);
      setSelectedCategories(updatedCategories); // Pass updated categories to parent component
    }
  };

  // Function to handle category removal
  const handleCategoryRemove = (e, category) => {
    e.stopPropagation(); // Prevent the popover from closing
    const updatedCategories = selectedCategories.filter((c) => c !== category);
    setLocalSelectedCategories(updatedCategories);
    setSelectedCategories(updatedCategories); // Pass updated categories to parent component
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-haspopup="listbox" // Improved accessibility
          aria-expanded={open}
          className="w-full justify-between rounded-[28px] bg-card/30 hover:bg-card/30 border-none text-fontlight/80 hover:text-fontlight h-[56px]"
        >
          {selectedCategories.length > 0 ? (
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
                    aria-label={`Remove ${category}`} // Added aria-label for accessibility
                  >
                    <AiOutlineClose /> {/* Replace '×' with icon */}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            "Select categories..."
          )}
          <FaCaretDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[482px] p-0 text-fontlight border-none">
        <Command className="bg-black text-fontlight p-3 border-none max-h-[308px] overflow-y-scroll">
          <div className="mt-2 ml-2">
            <p>You can add only up to 4 categories</p>
          </div>
          <CommandList className="mt-3">
            <CommandEmpty>No categories found.</CommandEmpty>
            <CommandGroup>
              {availableCategories.map((category) => (
                <CommandItem
                  key={category}
                  value={category}
                  className={cn(
                    "text-fontlight data-[selected='true']:bg-purple",
                    selectedCategories.includes(category) && "opacity-50 cursor-not-allowed"
                  )}
                  onSelect={() => handleCategorySelect(category)}
                  aria-selected={selectedCategories.includes(category) ? "true" : "false"}
                  disabled={selectedCategories.length === 4 && !selectedCategories.includes(category)} // Disable further selections when 4 are selected
                >
                  {category}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedCategories.includes(category)
                        ? "opacity-100 text-fontlight hover:text-black"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryCombobox;

