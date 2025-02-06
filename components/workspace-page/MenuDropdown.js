import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoStatsChart } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { FaRegTrashCan } from "react-icons/fa6";
import Link from "next/link";
import DeleteProduct from "./Modals/DeleteProduct";

function MenuDropdown({ deleteProduct }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="bg-none hover:bg-[#c088fb]">
          <BsThreeDots className="text-xl" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 bg-[#0a0a0b] text-fontlight rounded-2xl border-none p-2.5 flex flex-col">
        <DropdownMenuItem>
          <Link href="/workspace/analytics" className="flex flex-row gap-2.5 w-full rounded-[10px] p-2 group hover:bg-[#c088fb] justify-start items-center">
            <IoStatsChart className="text-[36px] text-[#ffffff] group-hover:text-[#0a0a0b]" />
            <p className="text-base font-medium group-hover:text-[#0a0a0b]">View Analysis</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button className="flex flex-row gap-2.5 w-full rounded-[10px] p-2 group hover:bg-[#c088fb] justify-start items-center">
            <TbEdit className="text-[36px] text-[#ffffff] group-hover:text-[#0a0a0b]" />
            <p className="text-base font-normal group-hover:text-[#0a0a0b]">Edit Product</p>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="flex flex-row gap-2.5 rounded-[10px] w-full p-2 group hover:bg-[#FF1E1E] justify-start items-center"
            onClick={openDeleteModal} // Open modal on delete click
          >
            <FaRegTrashCan className="text-[36px] text-red-900 group-hover:text-[#ffffff]" />
            <p className="text-base font-medium group-hover:text-[#ffffff]">Delete</p>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteProduct
          onClose={closeDeleteModal}
          onDelete={() => {
            deleteProduct(); // Call delete function passed as prop
            closeDeleteModal(); // Close the modal after deletion
          }}
        />
      )}
    </DropdownMenu>
  );
}

export default MenuDropdown;
