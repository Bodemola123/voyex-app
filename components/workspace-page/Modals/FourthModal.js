"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoMdInformationCircle } from "react-icons/io";
import "../../../app/globals.css";
import ImageUpload from "./ImageUpload";

const FourthModal = ({ closeModal, modalData, setModalData, createProduct,closeModalWithoutReset }) => {
  const [uploadedImage, setUploadedImage] = useState(modalData.image || null);

  // Handle image upload
  const handleImageUpload = (file) => {
    console.log("Uploaded Image File:", file); // Debugging: Check if file is valid
    setUploadedImage(file);
    setModalData((prevData) => ({
      ...prevData,
      image: file, // Update modalData with the uploaded image
    }));
  };
  

  // Handle image removal
  const handleImageRemove = () => {
    setUploadedImage(null);
    setModalData((prevData) => ({
      ...prevData,
      image: null, // Remove the image from modalData
    }));
  };

  // Validate and proceed to create the card
  const handleNext = () => {
    if (!uploadedImage) {
      alert("Please upload an image before proceeding.");
      return;
    }
      // Close the modal without resetting the modal data
  closeModalWithoutReset();

  // Trigger product creation in WorkSpace.js, keeping the data intact
  createProduct(); 
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#000000] text-white rounded-[41px] p-[26px] shadow-xl w-[90%] max-w-[794px] flex flex-col gap-[14px]">
        {/* Header */}
        <div className="flex justify-between items-center border-gray-700">
          <h2 className="text-xl md:text-2xl font-bold">Create New Model</h2>
          <button onClick={closeModal} className="flex items-center justify-center">
            <Image src={"/close-square.svg"} alt="X" width={58} height={58} />
          </button>
        </div>

        {/* Image Upload Section */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-start gap-2">
            <p className="text-[#ffffff] font-medium text-base">Brand Image</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <IoMdInformationCircle className="text-base text-[#f4f4f4]" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send the Brand Image I will need...</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm font-normal text-[#ffffff]">Image should be of dimensions: 1080x540</p>
          <div className="flex gap-2.5 w-full h-[298px] bg-[#131314] p-4 justify-center items-center rounded-[26px]">
            <ImageUpload
              onImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
              onImageRemove={handleImageRemove}
            />
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-between items-center">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-sm md:text-base bg-transparent text-white border border-[#FFFFFF26] rounded-[25px] hover:bg-gray-800 hover:border-[#c088fb] hover:scale-105 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleNext}
            disabled={!uploadedImage}
            className={`px-4 py-2 text-sm md:text-base bg-[#C088FB] text-[#0A0A0B] rounded-[25px] hover:scale-105 transition-all ${
              uploadedImage ? "" : "cursor-not-allowed opacity-50"
            }`}
          >
            Update Version Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default FourthModal;