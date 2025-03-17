import React, { useState } from "react";
import RoleCombobox from "./RoleCombobox"; // Import the RoleCombobox component
import Image from "next/image";
import { FaCaretDown } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FirstModal = ({ closeModal, openModal, modalData, setModalData }) => {
  // Handler to update specific input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Handler to update selected roles
  const handleRoleChange = (roles) => {
    setModalData((prev) => ({
      ...prev,
      roles, // Save the selected roles
    }));
  };

  return (
    <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)]  flex items-center justify-center z-50">
      <div className="bg-[#000000] text-white rounded-[41px] p-[26px] shadow-xl w-[90%] max-w-3xl max-h-[637px] h-[90%] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold">
            CREATE CUSTOM INSTRUCTIONS
          </h2>
          <button
            onClick={closeModal}
            className="flex items-center justify-center"
          >
            <Image src={"/close-square.svg"} alt="X" width={58} height={58} />
          </button>
        </div>
        <p className="text-sm md:text-base text-gray-300">
            What do you want Voyex to know about you?
          </p>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-6 pr-6 pl-1 space-y-6">

          {/* Role Combobox */}
          <div className="flex flex-col gap-2.5">
            <p className="text-sm font-medium text-left text-[#ffffff]">Role</p>
            <RoleCombobox
              selectedRoles={modalData.roles || []}
              setSelectedRoles={handleRoleChange}
            />
          </div>

          {/* Input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Describe Branding
              </label>
              <textarea
                name="branding"
                value={modalData.branding || ""}
                onChange={handleInputChange}
                className="w-full max-h-[130px] p-3 resize-none rounded-3xl bg-transparent border border-[#FFFFFF26] text-white focus:outline-none focus:ring focus:ring-[#c088fb]"
                rows="4"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Overview</label>
              <textarea
                name="overview"
                value={modalData.overview || ""}
                onChange={handleInputChange}
                className="w-full p-3 max-h-[130px] rounded-3xl border resize-none bg-transparent border-[#FFFFFF26] text-white focus:outline-none focus:ring focus:ring-[#c088fb]"
                rows="4"
              ></textarea>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Goals</label>
            <textarea
              name="goals"
              value={modalData.goals || ""}
              onChange={handleInputChange}
              className="w-full p-3 max-h-[130px] rounded-3xl border resize-none bg-transparent border-[#FFFFFF26] text-white focus:outline-none focus:ring focus:ring-[#c088fb]"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Describe Challenges Faced
            </label>
            <textarea
              name="challenges"
              value={modalData.challenges || ""}
              onChange={handleInputChange}
              className="w-full p-3 max-h-[130px] rounded-3xl border resize-none bg-transparent border-[#FFFFFF26] text-white focus:outline-none focus:ring focus:ring-[#c088fb]"
              rows="4"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Custom Dropdown for Preferred Tool */}
            <div className="flex flex-col gap-1">
      <label className="text-sm font-medium mb-1 text-left">
        Select Tool
      </label>

      <Select>
        <SelectTrigger className="w-full h-14 bg-[#0a0a0b] rounded-full outline-none border-none">
          <SelectValue placeholder="Select Tool" />
        </SelectTrigger>
        <SelectContent className="bg-[#0a0a0b] text-fontlight border-none rounded-3xl">
          <SelectGroup>
            <SelectLabel>Select Tool</SelectLabel>
            <SelectItem value="Tool 1">Tool 1</SelectItem>
            <SelectItem value="Tool 2">Tool 2</SelectItem>
            <SelectItem value="Tool 3">Tool 3</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

            {/* Custom Dropdown for Preferred Framework */}
            <div className="flex flex-col gap-1">
      <label className="text-sm font-medium mb-1 text-left ">
        Preferred Framework (If Applicable)
      </label>

      <Select>
        <SelectTrigger className="w-full h-14 bg-[#0a0a0b] rounded-full outline-none border-none">
          <SelectValue placeholder="Select Framework" />
        </SelectTrigger>
        <SelectContent className="bg-[#0a0a0b] text-fontlight  border-none rounded-3xl">
          <SelectGroup>
            <SelectLabel>Preferred Framework (If Applicable)</SelectLabel>
            <SelectItem value="Framework 1">Framework 1</SelectItem>
            <SelectItem value="Framework 2">Framework 2</SelectItem>
            <SelectItem value="Framework 3">Framework 3</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex py-6 pr-6 justify-between items-center">
          <button
            onClick={() => openModal("third")}
            className="px-[21px] py-2.5 text-sm md:text-base bg-transparent text-white border border-[#FFFFFF26] rounded-[25px] hover:bg-gray-800 hover:border-[#c088fb] outline-none focus:ring-none"
          >
            Intelligence
          </button>
          <button
            onClick={() => openModal("second")}
            className="px-[21px] py-2.5 text-sm md:text-base bg-[#C088FB] text-[#0A0A0B] rounded-[25px] focus:ring focus:ring-[#c088fb]"
          >
            Feedback Mechanism
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstModal;
