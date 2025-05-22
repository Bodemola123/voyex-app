"use client";

import { Check } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { useState } from "react";

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
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {countries} from "@/utils/countries";

function CountryDropdown({ setUserCountry }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-[28px] bg-[#0A0A0B]  hover:bg-[#0A0A0B]  border-none text-fontlight/80 hover:text-fontlight h-[56px]"
        >
          {value
            ? countries.find((c) => c.value === value)?.label
            : "Select country..."}
          <FaCaretDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 h-full p-0 text-fontlight border-none">
        <Command className="bg-black text-fontlight p-3 border-none max-h-[250px] overflow-y-scroll">
          <CommandInput
            placeholder="Search for country"
            className="border border-gray/20 rounded-[28px]"
            onValueChange={(val) => setSearchTerm(val)}
          />
          <CommandList className="mt-3">
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  aria-selected={value === country.value}
                  className="text-fontlight data-[selected='true']:bg-purple"
                  onSelect={(currentValue) => {
                    const selected = currentValue === value ? "" : currentValue;
                    setValue(selected);
                    setUserCountry(selected);
                    setOpen(false);
                  }}
                >
                  {country.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === country.value
                        ? "opacity-100 text-fontlight"
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

export default CountryDropdown;
