"use client";

import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const techRoles = [
  "Product Designer",
  "User Researcher",
  "UI Designer",
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "AI Engineer",
  "DevOps Engineer",
  "Mobile Developer",
  "Full Stack Developer",
  "Cloud Architect",
  "Cybersecurity Specialist",
  "Software Engineer",
  "Machine Learning Engineer",
  "Data Engineer",
  "Blockchain Developer",
  "QA Engineer",
  "Network Engineer",
  "Systems Administrator",
  "Business Intelligence Analyst",
  "Technical Project Manager",
  "Embedded Systems Engineer",
  "AR/VR Developer",
  "Game Developer",
  "Site Reliability Engineer",
  "Database Administrator",
];

const RoleCombobox = ({ setSelectedRoles }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedRoles, setLocalSelectedRoles] = useState([]);

  const filteredRoles = techRoles.filter(
    (role) =>
      role.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedRoles.includes(role)
  );

  const handleRoleSelect = (role) => {
    if (selectedRoles.length < 3 && !selectedRoles.includes(role)) {
      const updatedRoles = [...selectedRoles, role];
      setLocalSelectedRoles(updatedRoles);
      setSelectedRoles(updatedRoles); // Pass to parent
      setInputValue("");
    }
  };

  const handleRoleRemove = (e, role) => {
    // Prevent click event from triggering the Popover
    e.stopPropagation();

    const updatedRoles = selectedRoles.filter((r) => r !== role);
    setLocalSelectedRoles(updatedRoles);
    setSelectedRoles(updatedRoles); // Pass to parent
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-[28px] bg-[#0A0A0B]  hover:bg-[#0A0A0B]  border-none text-fontlight/80 hover:text-fontlight h-[56px]"
        >
          {selectedRoles.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedRoles.map((role) => (
                <div
                  key={role}
                  className="flex items-center gap-2 bg-[#C088FB33] text-[#c088fb] text-sm font-bold px-3 py-1 rounded-full"
                >
                  {role}
                  <button
                    onClick={(e) => handleRoleRemove(e, role)} // Pass event and role
                    className="text-white text-lg"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          ) : (
            "Select roles..."
          )}
          <FaCaretDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[482px] p-0 text-fontlight border-none">
        <Command className="bg-[#1c1d1f] text-fontlight p-3 border-none max-h-[308px] overflow-y-scroll">
          <div className="relative">
            <CommandInput
              placeholder="Search role"
              className="border border-gray/20 rounded-[28px] pl-10"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="mt-2 ml-2">
            <p>You can add up to 3 Roles</p>
          </div>
          <CommandList className="mt-3">
            <CommandEmpty>No roles found.</CommandEmpty>
            <CommandGroup>
              {filteredRoles.map((role) => (
                <CommandItem
                  key={role}
                  value={role}
                  className="text-fontlight data-[selected='true']:bg-purple"
                  onSelect={() => handleRoleSelect(role)}
                >
                  {role}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedRoles.includes(role)
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

export default RoleCombobox;
