import Image from 'next/image';
import React, { useState } from 'react';
import { IoMdInformationCircle } from 'react-icons/io';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  

const SecondModal = ({ closeModal, openModal, modalData, setModalData }) => {
  const [formError, setFormError] = useState(null); // State to manage form validation errors

  // Handle select changes
  const handleSelectChange = (key, value) => {
    setModalData({ ...modalData, [key]: value });
  };

  // Handle modal closing (clear errors if any)
  const handleClose = () => {
    setFormError(null);
    closeModal();
  };

  // Validate before proceeding
  const handleUpdateClick = () => {
    if (!modalData.role || !modalData.resourceType) {
      setFormError("Please select both Role and Resource Type.");
      return;
    }
    setFormError(null); // Clear any errors
    openModal(); // Proceed to the next modal
  };

  return (
    <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
      <div className='bg-[#000000] text-white rounded-[41px] p-[26px] shadow-xl w-[90%] max-w-3xl max-h-[497px] flex flex-col gap-[20px] overflow-hidden'>
        {/* Header */}
        <div className="flex justify-between items-center border-gray-700">
          <h2 className="text-xl md:text-2xl font-bold">Model Details</h2>
          <button onClick={handleClose} className="flex items-center justify-center">
            <Image src={"/close-square.svg"} alt="X" width={58} height={58} />
          </button>
        </div>

        {/* Form Section */}
        <div className='space-y-4'>
          {/* Python Details */}
          <div className='flex flex-col gap-4'>
            <div className='flex flex-row gap-2'>
              <p className='text-[#ffffff] font-medium text-base'>Python Details</p>
              
              <TooltipProvider>
                <Tooltip>
                <TooltipTrigger><IoMdInformationCircle className='text-base text-[#f4f4f4]'/></TooltipTrigger>
                <TooltipContent>
                <p>Python details are used to...</p>
                </TooltipContent>
                </Tooltip>
                </TooltipProvider>

            </div>
            <div className="flex flex-col gap-1 w-full">
              <Select onValueChange={(value) => handleSelectChange("role", value)} value={modalData.role || ""}>
                <SelectTrigger className={`w-full h-14 bg-[#0a0a0b] rounded-full outline-none border-none ${formError && !modalData.role ? "border-red-500" : "border-transparent"} focus:outline-none`}>
                  <SelectValue placeholder="Select Roles" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0b] text-fontlight border-none rounded-3xl">
                  <SelectGroup>
                    <SelectLabel>Select Roles</SelectLabel>
                    <SelectItem value="Role 1">Role 1</SelectItem>
                    <SelectItem value="Role 2">Role 2</SelectItem>
                    <SelectItem value="Role 3">Role 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Resource Type */}
          <div className='flex flex-col gap-4'>
            <div className='flex flex-row items-center justify-start gap-2'>
              <p className='text-[#ffffff] font-medium text-base'>Resource type</p>
              <TooltipProvider>
                <Tooltip>
                <TooltipTrigger><IoMdInformationCircle className='text-base text-[#f4f4f4]'/></TooltipTrigger>
                <TooltipContent>
                <p>Resource type are used to...</p>
                </TooltipContent>
                </Tooltip>
                </TooltipProvider>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Select onValueChange={(value) => handleSelectChange("resourceType", value)} value={modalData.resourceType || ""}>
                <SelectTrigger className={`w-full h-14 bg-[#0a0a0b] rounded-full outline-none border-none ${formError && !modalData.resourceType ? "border-red-500" : "border-transparent"} focus:outline-none`}>
                  <SelectValue placeholder="Select Resource Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0b] text-fontlight border-none rounded-3xl">
                  <SelectGroup>
                    <SelectLabel>Select Resource Type</SelectLabel>
                    <SelectItem value="Type 1">Type 1</SelectItem>
                    <SelectItem value="Type 2">Type 2</SelectItem>
                    <SelectItem value="Type 3">Type 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {formError && <div className="text-red-500 text-sm mt-2">{formError}</div>}

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleClose}
            className="px-[21px] py-2.5 text-sm md:text-base bg-transparent text-white border border-[#FFFFFF26] rounded-[25px] hover:bg-gray-800 hover:border-[#c088fb] hover:scale-105 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateClick}
            disabled={!modalData.role || !modalData.resourceType}
            className={`px-[21px] py-2.5 text-sm md:text-base bg-[#C088FB] text-[#0A0A0B] rounded-[25px] hover:scale-105 transition-all ${modalData.role && modalData.resourceType ? "" : "cursor-not-allowed"}`}
          >
            Update Model Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondModal;