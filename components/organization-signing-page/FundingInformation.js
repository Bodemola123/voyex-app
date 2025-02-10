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

const fundingOptions = [
  { value: "equity", label: "Equity Financing" },
  { value: "debt", label: "Debt Financing" },
  { value: "grants", label: "Grants" },
  { value: "revenue", label: "Revenue-based Financing" },
  { value: "hybrid", label: "Hybrid Financing" },
  { value: "bootstrapping", label: "Bootstrapping" },
  { value: "asset", label: "Asset-based Financing" },
];

export function FundingInformation({ fundingInput, initialValue = "" }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);

  // Memoize selected funding label based on selected value
  const selectedFundingOption = useMemo(
    () => fundingOptions.find((option) => option.value === value)?.label,
    [value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select Funding Option"
          aria-expanded={open}
          className="w-full justify-between rounded-[28px] bg-card/30 hover:bg-card/30 border-none text-fontlight/80 hover:text-fontlight h-[56px]"
        >
          {selectedFundingOption || "Select funding option..."}
          <FaCaretDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 text-fontlight border-none">
        <Command className="bg-black text-fontlight p-3 border-none max-h-[250px] overflow-y-scroll">
          <CommandInput
            placeholder="Search for funding option"
            aria-label="Search Funding Option"
            className="border border-gray/20 rounded-[28px]"
          />
          <CommandList className="mt-3">
            <CommandEmpty>No funding option found.</CommandEmpty>
            <CommandGroup>
              {fundingOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  className="text-fontlight data-[selected='true']:bg-purple"
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    fundingInput(newValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value
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
}
