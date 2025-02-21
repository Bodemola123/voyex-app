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

const audiences = [
  {
    value: "student",
    label: "Student",
  },
  {
    value: "programmers",
    label: "Programmers",
  },
  {
    value: "politicians",
    label: "Politicians",
  },
  {
    value: "engineers",
    label: "Engineers",
  },
  {
    value: "designers",
    label: "Designers",
  },
  {
    value: "farmers",
    label: "Farmers",
  },
  {
    value: "bankers",
    label: "Bankers",
  },
  {
    value: "scientists",
    label: "Scientists",
  },
];

function TargetAudienceDropdown({ setOrgAudience }) {
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
            ? audiences.find((audience) => audience.value === value)?.label
            : "Select audience..."}
          <FaCaretDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 h-full p-0 text-fontlight border-none">
        <Command className="bg-black text-fontlight p-3 border-none max-h-[250px] overflow-y-scroll scrollbar-hide">
          <CommandInput
            placeholder="Search for audience"
            className="border border-gray/20 rounded-[28px] "
          />
          <CommandList className="mt-3 scrollbar-hide">
            <CommandEmpty>No audience found.</CommandEmpty>
            <CommandGroup>
              {audiences.map((audience) => (
                <CommandItem
                  key={audience.value}
                  value={audience.value}
                  className="text-fontlight data-[selected='true']:bg-purple"
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOrgAudience(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {audience.label}
                  <Check
                    className={cn(
                      "ml-auto ",
                      value === audience.value
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

export default TargetAudienceDropdown;
