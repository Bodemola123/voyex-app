"use client";

import React, { useState } from "react";
import axios from "axios";
import MultiSelectInput from "./MultiSelectInput";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import "../../../app/globals.css";
import Image from "next/image";

function FirstModal({ closeModal, openModal, modalData, setModalData }) {
  const [selectedCategories, setSelectedCategories] = useState(modalData.categories || []);
  const [loading, setLoading] = useState(false);

  // Handle category selection
  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
    setModalData({ ...modalData, categories }); // Update modalData with selected categories
  };

  // Handle input changes for name and description
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  // Validate tool name before proceeding
  const handleUpdateClick = async () => {
    if (!modalData.name?.trim() || !modalData.description?.trim()) {
      alert("Please fill out all required fields.");
      return;
    }
    if (selectedCategories.length === 0) {
      alert("Please select at least one category.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://xklp1j7zp3.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tool_workspace?tool_name=${modalData.name}`
      );
      
      if (response.status === 200) {
        toast.error("Tool name already exists. Please choose a different name.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Tool name does not exist, proceed to next step
        openModal();
      } else {
        toast.error("An error occurred while checking the tool name. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#000000] text-white rounded-[41px] p-[26px] shadow-xl w-[90%] max-w-3xl max-h-[637px] flex flex-col gap-[29px] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center border-gray-700">
          <h2 className="text-2xl md:text-2xl font-bold">Create New Model</h2>
          <button onClick={closeModal} className="flex items-center justify-center">
            <Image src="/close-square.svg" alt="X" width={58} height={58} />
          </button>
        </div>
        {/* Form */}
        <div className="space-y-4">
          {/* Category Selection */}
          <div className="flex flex-col gap-2.5">
            <p className="text-base font-medium text-left text-[#ffffff]">Category</p>
            <MultiSelectInput
              selectedCategories={selectedCategories}
              setSelectedCategories={handleCategoryChange}
            />
          </div>

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-base text-[#ffffff] font-medium mb-2">Name</label>
            <textarea
              id="name"
              name="name"
              value={modalData.name || ""}
              onChange={handleInputChange}
              className="w-full max-h-[64px] p-3 resize-none rounded-3xl bg-transparent border border-[#FFFFFF26] text-white focus:outline-none focus:ring focus:ring-[#c088fb]"
              rows="1"
            ></textarea>
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-base text-[#ffffff] font-medium mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={modalData.description || ""}
              onChange={handleInputChange}
              className="w-full max-h-[130px] scrollbar-hide p-3 resize-none rounded-3xl bg-transparent border border-[#FFFFFF26] text-white focus:outline-none focus:ring focus:ring-[#c088fb]"
              rows="4"
            ></textarea>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={closeModal}
            className="px-[21px] py-2.5 text-sm md:text-base bg-transparent text-white border border-[#FFFFFF26] rounded-[25px] hover:bg-gray-800 hover:border-[#c088fb] hover:scale-105 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateClick}
            disabled={!modalData.name?.trim() || !modalData.description?.trim() || selectedCategories.length === 0 || loading}
            className={`px-[21px] py-2.5 text-sm md:text-base bg-[#C088FB] text-[#0A0A0B] rounded-[25px] hover:scale-105 transition-all ${modalData.name?.trim() && modalData.description?.trim() && selectedCategories.length > 0 && !loading ? "" : "cursor-not-allowed"}`}
          >
            {loading ? "Checking..." : "Update Version Details"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FirstModal;
