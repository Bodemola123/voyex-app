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

const skillLevel = [
  {
    value: "beginner",
    label: "1-3 years",
  },
  {
    value: "intermediate",
    label: "3-5 years",
  },
  {
    value: "advanced",
    label: "5+ years",
  },
];

function SkillLevelDropdown({ setSkillLevel }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

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
            ? skillLevel.find((skill) => skill.value === value)?.label
            : "Select skill..."}
          <FaCaretDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 h-full p-0 text-fontlight border-none">
        <Command className="bg-black text-fontlight p-3 border-none max-h-[250px] overflow-y-scroll">
          <CommandInput
            placeholder="Search for skill"
            className="border border-gray/20 rounded-[28px] "
          />
          <CommandList className="mt-3">
            <CommandEmpty>No skill found.</CommandEmpty>
            <CommandGroup>
              {skillLevel.map((skill) => (
                <CommandItem
                  key={skill.value}
                  value={skill.value}
                  className="text-fontlight data-[selected='true']:bg-purple"
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setSkillLevel(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {skill.label}
                  <Check
                    className={cn(
                      "ml-auto ",
                      value === skill.value
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

export default SkillLevelDropdown;
