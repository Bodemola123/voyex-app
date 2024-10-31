"use client";
import { BsThreeDots } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { menuDropdownItem } from "@/constants/workspace-page";

function MenuDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-none hover:bg-btnlime">
          <BsThreeDots className="text-xl" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#1C1C1C] text-fontlight rounded-2xl border-none p-4">
        <DropdownMenuGroup>
          {menuDropdownItem.map((item, i) => (
            <DropdownMenuItem
              key={i}
              className="gap-3 bg-none hover:bg-white/10 focus:bg-white/10 focus:text-fontlight rounded-lg cursor-pointer py-2 first:mt-0 mt-1"
            >
              <Image src={item.image} alt={`edit`} width={24} height={24} />
              <span className="capitalize text-base font-normal">
                {item.name}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MenuDropdown;
