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
import { IoStatsChart } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { FaRegTrashCan } from "react-icons/fa6";
import Link from "next/link";

function MenuDropdown({ deleteProduct }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="bg-none hover:bg-[#c088fb]">
          <BsThreeDots className="text-xl" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 bg-[#0a0a0b] text-fontlight rounded-2xl border-none p-2.5 flex flex-col">
        <DropdownMenuGroup>
            <DropdownMenuItem
              className="gap-2 cursor-pointer flex flex-col items-start justify-center">
              <Link 
              href="/workspace/analytics"
              className="flex flex-row gap-2.5 w-full rounded-[10px] p-2 group hover:bg-[#c088fb] justify-start items-center">
                <IoStatsChart className="text-[36px] text-[#ffffff] group-hover:text-[#0a0a0b]" />
                <p className="text-base font-medium group-hover:text-[#0a0a0b]">View Analysis</p>
              </Link>
              <button className="flex flex-row gap-2.5 w-full rounded-[10px] p-2 group hover:bg-[#c088fb] justify-start items-center">
                <TbEdit className="text-[36px] text-[#ffffff] group-hover:text-[#0a0a0b]" />
                <p className="text-base font-normal group-hover:text-[#0a0a0b]">Edit Product</p>
              </button>
              <button
                className="flex flex-row gap-2.5 rounded-[10px] w-full p-2 group hover:bg-[#FF1E1E] justify-start items-center"
                onClick={deleteProduct} // Trigger delete function
              >
                <FaRegTrashCan className="text-[36px] text-red-900 group-hover:text-[#ffffff]" />
                <p className="text-base font-medium group-hover:text-[#ffffff]">Delete</p>
              </button>
            </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MenuDropdown;
