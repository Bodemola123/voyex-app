"use client";

import { Check } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
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

const dataPrivacyOptions = [
  { value: "General Privacy Policy", label: "General Privacy Policy" },
  { value: "Cookie Policy", label: "Cookie Policy" },
  { value: "Data Collection Policy" , label: "Data Collection Policy" },
  { value: "Data Retention Policy", label: "Data Retention Policy" },
  { value: "Data Access and Sharing Policy", label: "Data Access and Sharing Policy" },
  { value: "Data Security Policy", label: "Data Security Policy" },
  { value: "Data Breach Notification Policy", label: "Data Breach Notification Policy" },
  { value: "Children's Privacy Policy (COPPA)", label: "Children's Privacy Policy (COPPA)" },
  { value: "GDPR Privacy Policy", label: "GDPR Privacy Policy" },
  { value: "CCPA Privacy Policy", label: "CCPA Privacy Policy" },
  { value: "Third-Party Data Processing Policy", label: "Third-Party Data Processing Policy" },
];

export function DataPrivacy({ privacyInput }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSelect = (currentValue) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    privacyInput(newValue); // Call the parent function with selected value
    setOpen(false); // Close the dropdown
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select Data Privacy Policy"
          aria-expanded={open}
          className="w-full justify-between rounded-[28px] bg-card/30 hover:bg-card/30 border-none text-white/80 hover:text-white h-[56px]"
        >
          {value || "Select Privacy Policy..."}
          <FaCaretDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 text-white border-none">
        <Command className="bg-black text-white p-3 border-none max-h-[250px] overflow-y-scroll">
        <CommandInput
            placeholder="Search for Data Policy"
            aria-label="Search for Data Policy"
            className="border border-gray/20 rounded-[28px]"
          />
          <CommandList>
            {dataPrivacyOptions.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                className="text-white data-[selected='true']:bg-[#c088fb]"
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
