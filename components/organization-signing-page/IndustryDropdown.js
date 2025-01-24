"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";

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
import { useState } from "react";

const indutries = [
  {
    value: "technology",
    label: "Technology",
  },
  {
    value: "health",
    label: "Health",
  },
  {
    value: "business",
    label: "Business",
  },
  {
    value: "marketing",
    label: "Marketing",
  },
  {
    value: "design",
    label: "Design",
  },
  {
    value: "trading",
    label: "Trading",
  },
  {
    value: "e-commerce",
    label: "E-commerce",
  },
  {
    value: "agriculture",
    label: "Agriculture",
  },
];

export function IndustryDropdown({ setOrgIndustry }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-[28px] bg-card/30 hover:bg-card/30 border-none text-fontlight/80 hover:text-fontlight h-[56px]"
        >
          {value
            ? indutries.find((industry) => industry.value === value)?.label
            : "Select industry..."}
          <FaCaretDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 text-fontlight border-none">
        <Command className="bg-black text-fontlight p-3 border-none">
          <CommandInput
            placeholder="Search for industry"
            className="border border-gray/20 rounded-[28px] "
          />
          <CommandList className=" mt-3">
            <CommandEmpty>No industry found.</CommandEmpty>
            <CommandGroup>
              {indutries.map((industry) => (
                <CommandItem
                  key={industry.value}
                  value={industry.value}
                  className="text-fontlight data-[selected='true']:bg-purple"
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOrgIndustry(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {industry.label}
                  <Check
                    className={cn(
                      "ml-auto ",
                      value === industry.value
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
