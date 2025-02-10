"use client";

import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const certificationOptions = [
  { value: "professional", label: "Professional Certifications (e.g., PMP, CPA)" },
  { value: "product", label: "Product Certifications (e.g., CE Marking, UL Certification)" },
  { value: "environmental", label: "Environmental and Sustainability Certifications (e.g., LEED)" },
  { value: "quality", label: "Quality Certifications (e.g., ISO 9001, Six Sigma)" },
  { value: "industrySpecific", label: "Industry-Specific Certifications (e.g., HIPAA, PCI DSS)" },
  { value: "safety", label: "Safety Certifications (e.g., OSHA, First Aid)" },
  { value: "technology", label: "Technology Certifications (e.g., AWS, CCNA)" },
];

export function Certifications({ certificationsInput }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSelect = (currentValue) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    certificationsInput(newValue); // Call the parent function with selected value
    setOpen(false); // Close the dropdown
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select Certification Type"
          aria-expanded={open}
          className="w-full justify-between rounded-[28px] bg-card/30 hover:bg-card/30 border-none text-fontlight/80 hover:text-fontlight h-[56px]"
        >
          {value || "Select Certification Type..."}
          <FaCaretDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 text-fontlight border-none">
        <Command className="bg-black text-fontlight p-3 border-none max-h-[250px] overflow-y-scroll">
          <CommandInput
            placeholder="Search for Certifications"
            aria-label="Search for Certifications"
            className="border border-gray/20 rounded-[28px]"
          />
          <CommandList>
            {certificationOptions.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                className="text-fontlight data-[selected='true']:bg-purple"
                onSelect={() => handleSelect(option.value)}
              >
                {option.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
