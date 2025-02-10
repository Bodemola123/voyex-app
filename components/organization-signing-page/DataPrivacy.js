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
  { value: "general", label: "General Privacy Policy" },
  { value: "cookie", label: "Cookie Policy" },
  { value: "dataCollection", label: "Data Collection Policy" },
  { value: "dataRetention", label: "Data Retention Policy" },
  { value: "dataAccess", label: "Data Access and Sharing Policy" },
  { value: "dataSecurity", label: "Data Security Policy" },
  { value: "dataBreach", label: "Data Breach Notification Policy" },
  { value: "children", label: "Children's Privacy Policy (COPPA)" },
  { value: "gdpr", label: "GDPR Privacy Policy" },
  { value: "ccpa", label: "CCPA Privacy Policy" },
  { value: "thirdParty", label: "Third-Party Data Processing Policy" },
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
          className="w-full justify-between rounded-[28px] bg-card/30 hover:bg-card/30 border-none text-fontlight/80 hover:text-fontlight h-[56px]"
        >
          {value || "Select Privacy Policy..."}
          <FaCaretDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 text-fontlight border-none">
        <Command className="bg-black text-fontlight p-3 border-none max-h-[250px] overflow-y-scroll">
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
