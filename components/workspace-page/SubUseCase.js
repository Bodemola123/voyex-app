"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FaChevronDown } from "react-icons/fa";

function SubUseCase() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-2 w-full mt-4">
        <label className="text-sm font-medium text-left uppercase">
          sub use cases
        </label>

        <DropdownMenu className="w-full">
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center justify-between w-full h-14 bg-input rounded-full outline-none border-none">
              <span>Select</span>
              <FaChevronDown className="text-xs text-fontfaded" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[140%] bg-input text-fontlight border-none">
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              To help solve health challenges
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
              // disabled
            >
              For gaming
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              educationally inclined
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-btnlime text-xs font-medium">
        Select up to 10 sub use cases
      </p>
    </>
  );
}

export default SubUseCase;
