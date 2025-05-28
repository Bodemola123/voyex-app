"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import MultiSelectInput from "./MultiSelectInput";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import "../../../app/globals.css";
import Image from "next/image";
import { FaCaretDown } from "react-icons/fa";

function FirstModal({ closeModal, openModal, modalData, setModalData }) {
  const [selectedCategories, setSelectedCategories] = useState(modalData.categories || []);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(modalData.primaryCategory || "");
const [openDropdown, setOpenDropdown] = useState(null);
const categoryOptions = [
  'Audio-generators', 'Content Creation', 'Productivity', 'Design',
  'Marketing', 'Social', 'Video', 'Social-media', 'Video-generators',
  'Research-assistant', 'Image-genrators', 'Text-generators',
  'Website-builders', 'SEO'
];

const toggleDropdown = (type) => {
  setOpenDropdown(openDropdown === type ? null : type);
};

const handleCategorySelect = (category) => {
  setSelectedCategory(category);
  setModalData({ ...modalData, primaryCategory: category });
  setOpenDropdown(null);
};


  // Handle category selection
  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
    setModalData({ ...modalData, categories }); // Update modalData with selected categories
  };

  const handleTagChange = (e) => {
  const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
  setModalData({ ...modalData, tags: tags });
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

    if (response.data.exists === false) {
      // Tool name does not exist, proceed to next step
      openModal();
    } else {
      toast.error("Tool name already exists. Please choose a different name.");
    }
  } catch (error) {
    toast.error("An error occurred while checking the tool name. Please try again.");
  } finally {
    setLoading(false);
  }
};


      useEffect(() => {
      function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setOpenDropdown(null);
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  return (
    <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)]  flex items-center justify-center z-50">
      <div className="bg-[#1c1d1f] text-white rounded-[41px] p-[26px] shadow-xl w-[90%] max-w-3xl max-h-[637px] flex flex-col gap-[29px]"  ref={dropdownRef}>
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl md:text-2xl font-bold">Create New Tool</h2>
          <button onClick={closeModal} className="flex items-center justify-center">
            <Image src="/close-square.svg" alt="X" width={58} height={58} />
          </button>
        </div>
        {/* Form */}
        <div className="space-y-2 overflow-y-auto scrollbar-hide">
          {/* Category Selection */}
          <div className="space-y-1 relative">
  <label className="text-[#F4F4F4] text-sm font-medium">Primary Category</label>
  <div
    className="w-full py-3 px-4 bg-[#0A0A0B] text-gray-300 rounded-[68px] cursor-pointer flex items-center justify-between"
    onClick={() => toggleDropdown('category')}
  >
    <span>{selectedCategory || 'Select category'}</span>
    <FaCaretDown />
  </div>
  {openDropdown === 'category' && (
    <div className="absolute z-10 mt-2 w-full bg-[#0A0A0B] max-h-48 overflow-y-auto rounded-2xl shadow-lg scrollbar-hide">
      {categoryOptions.map((category) => (
        <div
          key={category}
          className="px-4 py-2 text-base text-white hover:bg-[#1f1f1f] cursor-pointer capitalize"
          onClick={() => handleCategorySelect(category)}
        >
          {category}
        </div>
      ))}
    </div>
  )}
</div>

          <div className="flex flex-col gap-2.5 px-1">
            <p className="text-base font-medium text-left text-[#ffffff]">Sub-Category</p>
            <MultiSelectInput
              selectedCategories={selectedCategories}
              setSelectedCategories={handleCategoryChange}
            />
          </div>

          {/* Name Input */}
          <div className="space-y-1 px-1">
            <label htmlFor="name" className="block text-base text-[#ffffff] font-medium mb-2">Tool Name</label>
            <textarea
              id="name"
              name="name"
              value={modalData.name || ""}
              onChange={handleInputChange}
              className="w-full max-h-[64px] p-4 resize-none rounded-3xl bg-[#0a0a0b] border border-[#FFFFFF26] text-white focus:outline-none focus:ring focus:ring-[#c088fb]"
              rows="1"
            ></textarea>
          </div>
          <div className="space-y-1 px-1">
  <label className="text-[#F4F4F4] text-sm font-medium">Product Website / Landing Page</label>
  <input
    type="text"
    name="productUrl"
    placeholder="https://yourproduct.com"
    className="rounded-[28px] bg-[#0a0a0b] placeholder:text-[#f4f4f4] text-[#f4f4f4] h-[56px] w-full px-4 border-none focus:outline-none focus:ring-0"
    value={modalData.productUrl || ""}
    onChange={handleInputChange}
  />
</div>


          {/* Description Input */}
          <div className="px-1">
            <label htmlFor="description" className="block text-base text-[#ffffff] font-medium mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={modalData.description || ""}
              onChange={handleInputChange}
              className="w-full max-h-[130px] scrollbar-hide p-4 resize-none rounded-3xl bg-[#0a0a0b] border border-[#FFFFFF26] text-white focus:outline-none focus:ring focus:ring-[#c088fb]"
              rows="4"
            ></textarea>
          </div>
          <div className="space-y-1 px-1">
  <label className="text-[#F4F4F4] text-sm font-medium">Keywords / Tags</label>
  <input
    type="text"
    placeholder="e.g. AI, generator, chatbot"
    className="rounded-[28px] bg-[#0a0a0b] placeholder:text-[#f4f4f4] text-[#f4f4f4] h-[56px] w-full px-4 border-none focus:outline-none focus:ring-0"
    onChange={handleTagChange}
    value={(modalData.tags || []).join(', ')}
  />
</div>

        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center px-1">
          <button
            onClick={closeModal}
            className="px-[21px] py-2.5 text-sm md:text-base bg-transparent text-white border border-[#FFFFFF26] rounded-[25px] hover:bg-gray-800 hover:border-[#c088fb] hover:scale-105 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateClick}
            disabled={!modalData.name?.trim() || !modalData.description?.trim() || selectedCategories.length === 0 || !modalData.tags || modalData.productUrl || modalData.primaryCategory || loading}
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
