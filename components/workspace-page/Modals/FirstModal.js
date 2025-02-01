import Image from "next/image"; 
import React, { useState } from "react";
import CategoryCombobox from "./CategoryCombobox"; // Assuming this is a multi-select component
import "../../../app/globals.css";

function FirstModal({ closeModal, openModal, modalData, setModalData }) {
  // Local state to manage category selection (initialize as empty to avoid retaining values)
  const [selectedCategories, setSelectedCategories] = useState(modalData.categories || []);
  const [formError, setFormError] = useState(null); // For validation errors

  // Handle category selection (multi-select, max 4 categories)
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      // Remove category if already selected
      const updatedCategories = selectedCategories.filter((item) => item !== category);
      setSelectedCategories(updatedCategories);
      setModalData({ ...modalData, categories: updatedCategories }); // Save to modalData
    } else if (selectedCategories.length < 4) {
      // Add category if less than 4 selected
      const updatedCategories = [...selectedCategories, category];
      setSelectedCategories(updatedCategories);
      setModalData({ ...modalData, categories: updatedCategories }); // Save to modalData
    } else {
      setFormError("You can select up to 4 categories.");
    }
  };

  // Handle input changes for name and description
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  // Reset form data when modal is closed
  const handleClose = () => {
    setFormError(null); // Clear any form errors
    setSelectedCategories([]); // Reset selected categories
    setModalData({ ...modalData, name: "", description: "", categories: [] }); // Reset modal data
    closeModal();
  };

  // Validate form before proceeding
  const handleUpdateClick = () => {
    if (!modalData.name?.trim() || !modalData.description?.trim()) {
      setFormError("Please fill out all required fields.");
      return;
    }
    if (selectedCategories.length === 0) {
      setFormError("Please select at least one category.");
      return;
    }
    setFormError(null); // Clear any errors
    openModal(); // Proceed to the next modal
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#000000] text-white rounded-[41px] p-[26px] shadow-xl w-[90%] max-w-3xl max-h-[637px] flex flex-col gap-[29px] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center border-gray-700">
          <h2 className="text-xl md:text-2xl font-bold">Create New Model</h2>
          <button onClick={handleClose} className="flex items-center justify-center">
            <Image src={"/close-square.svg"} alt="X" width={58} height={58} />
          </button>
        </div>
        {/* Form */}
        <div className="space-y-4">
          {/* Category Selection */}
          <div className="flex flex-col gap-2.5">
            <p className="text-base font-medium text-left text-[#ffffff]">Category</p>
            <CategoryCombobox
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories} // Pass the state management for selected categories
              onCategoryChange={handleCategoryChange} // Update modalData when category is changed
            />
          </div>

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-base text-[#ffffff] font-medium mb-2">Name</label>
            <textarea
              id="name"
              name="name"
              type="text"
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

        {/* Error Message */}
        {formError && (
          <div className="text-red-500 text-sm mt-2">
            {formError}
          </div>
        )}

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
            disabled={!modalData.name?.trim() || !modalData.description?.trim() || selectedCategories.length === 0}
            className={`px-[21px] py-2.5 text-sm md:text-base bg-[#C088FB] text-[#0A0A0B] rounded-[25px] hover:scale-105 transition-all ${modalData.name?.trim() && modalData.description?.trim() && selectedCategories.length > 0 ? "" : "cursor-not-allowed"}`}
          >
            Update Version Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default FirstModal;
