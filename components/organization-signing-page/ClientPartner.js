"use client";

import { useState, useMemo } from "react";
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

const clientPartnerTypes = [
  { value: "Business-to-Business (B2B)" , label: "Business-to-Business (B2B)" },
  { value: "Business-to-Consumer (B2C)", label: "Business-to-Consumer (B2C)" },
  { value: "Government", label: "Government" },
  { value: "Non-profit Organizations", label: "Non-profit Organizations" },
  { value: "Strategic Partners", label: "Strategic Partners" },
  { value: "Equity Partners", label: "Equity Partners" },
  { value: "Channel Partners", label: "Channel Partners" },
  { value: "Affiliate Partners", label: "Affiliate Partners" },
];

export function ClientPartnerDropdown({ clientInput, initialValue = "" }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);

  // Memoize the selected option based on user selection
  const selectedOption = useMemo(() => {
    return (
      clientPartnerTypes.find((item) => item.value === value)?.label ||
      "Select option..."
    );
  }, [value]);

  const handleSelect = (selectedValue) => {
    setValue(selectedValue);
    clientInput(selectedValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select Client/Partner Type"
          aria-expanded={open}
          className="w-full justify-between rounded-[28px] bg-card/30 hover:bg-card/30 border-none text-fontlight/80 hover:text-fontlight h-[56px]"
        >
          {selectedOption}
          <FaCaretDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-96 p-0 text-fontlight border-none"
        side="top"
        align="center"
      >
        <Command className="bg-black text-fontlight p-3 border-none max-h-[250px] overflow-y-scroll scrollbar-hide">
          <CommandInput
            placeholder="Search for Client/Partner types"
            aria-label="Search Client/Partner types"
            className="border border-gray/20 rounded-[28px]"
          />
          <CommandList className="mt-3 scrollbar-hide">
            {/* No options found */}
            {clientPartnerTypes.length === 0 && (
              <CommandEmpty>No options found.</CommandEmpty>
            )}

            {/* Display client/partner options */}
            <CommandGroup>
              {clientPartnerTypes.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  className="text-fontlight data-[selected='true']:bg-purple"
                  onSelect={() => handleSelect(item.value)}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
