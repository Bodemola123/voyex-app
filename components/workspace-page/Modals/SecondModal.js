import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaCaretDown, FaCheck } from "react-icons/fa";

const platformOptions = ["Web", "Android", "iOS", "API", "Desktop"];
const pricingModelOptions = ["Free", "Paid", "Subscription"];
const apiAccessOptions = ["Yes", "No"];

const SecondModal = ({ closeModal, openModal, modalData, setModalData }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);


  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
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

  // Toggle platform selection (multi-select)
  const togglePlatform = (platform) => {
    const selected = modalData.availablePlatforms || [];
    if (selected.includes(platform)) {
      setModalData({
        ...modalData,
        availablePlatforms: selected.filter((p) => p !== platform),
      });
    } else {
      setModalData({
        ...modalData,
        availablePlatforms: [...selected, platform],
      });
    }
  };

  // Select pricing model or API access (single select)
  const handleSingleSelect = (key, value) => {
    setModalData({ ...modalData, [key]: value });
    setOpenDropdown(null);
  };

  // Handle input change for text fields
const handleInputChange = (key, value) => {
  setModalData({ ...modalData, [key]: value.trimStart() });
};


  // Check all fields filled to enable Update button
  const isFormValid = () => {
    const {
      detailedFeatures,
      pricingModel,
      pricingDetails,
      availablePlatforms,
      apiAccess,
      integrationOptions,
      demoVideoUrl,
    } = modalData;

    return (
      detailedFeatures?.trim() &&
      pricingModel &&
      pricingDetails?.trim() &&
      availablePlatforms?.length > 0 &&
      apiAccess &&
      integrationOptions?.trim() &&
      demoVideoUrl?.trim()
    );
  };

  const handleUpdateClick = () => {
    if (!isFormValid()) return;
    openModal();
  };

  return (
    <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)] flex items-center justify-center z-50">
      <div className="bg-[#1c1d1f] text-white rounded-[41px] p-[26px] shadow-xl w-[90%] max-w-3xl flex flex-col gap-[20px] max-h-[637px]"  ref={dropdownRef}>
        {/* Header */}
        <div className="flex justify-between items-center border-gray-700">
          <h2 className="text-xl md:text-2xl font-bold">Tool Details</h2>
          <button onClick={closeModal} className="flex items-center justify-center">
            <Image src="/close-square.svg" alt="X" width={58} height={58} />
          </button>
        </div>

        {/* Form fields */}
        <div className="space-y-2 overflow-y-auto scrollbar-hide px-1">
        {/* Detailed Features (textarea) */}
        <div className="space-y-1">
          <label className="text-[#F4F4F4] text-sm font-medium">Detailed Features</label>
          <textarea
            className="w-full h-24 p-4 rounded-[28px] bg-[#0a0a0b] text-[#f4f4f4] resize-none outline-none border-none placeholder:text-[#f4f4f4]"
            placeholder="Enter key features separated by commas or freely"
            value={modalData.detailedFeatures || ""}
            onChange={(e) => handleInputChange("detailedFeatures", e.target.value)}
          />
        </div>

        {/* Pricing Model (dropdown) */}
        <div className="space-y-1 relative">
          <label className="text-[#F4F4F4] text-sm font-medium">Pricing Model</label>
          <div
            className="w-full py-3 px-4 bg-[#0A0A0B] text-gray-300 rounded-[68px] cursor-pointer flex items-center justify-between"
            onClick={() => toggleDropdown("pricingModel")}
          >
            <span>{modalData.pricingModel || "Select Pricing Model"}</span>
            <FaCaretDown />
          </div>
          {openDropdown === "pricingModel" && (
            <div className="absolute z-10 mt-2 w-full bg-[#0A0A0B] max-h-48 overflow-y-auto rounded-2xl shadow-lg scrollbar-hide">
              {pricingModelOptions.map((option) => (
                <div
                  key={option}
                  className="px-4 py-2 text-base text-white hover:bg-[#131314] cursor-pointer capitalize"
                  onClick={() => handleSingleSelect("pricingModel", option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing Details / Plan Link (input) */}
        <div className="space-y-1">
          <label className="text-[#F4F4F4] text-sm font-medium">Pricing Details / Plan Link</label>
          <input
            type="text"
            placeholder="https://yourproduct.com/pricing"
            className="rounded-[28px] bg-[#0a0a0b] placeholder:text-[#f4f4f4] text-[#f4f4f4] h-[56px] border-none focus:outline-none outline-none focus:ring-0 w-full px-4"
            value={modalData.pricingDetails || ""}
            onChange={(e) => handleInputChange("pricingDetails", e.target.value)}
          />
        </div>

        {/* Available Platforms (multi-select) */}
        <div className="space-y-1 relative">
          <label className="text-[#F4F4F4] text-sm font-medium">Available Platforms</label>
          <div
            className="w-full py-3 px-4 bg-[#0A0A0B] text-[#f4f4f4] rounded-[68px] cursor-pointer flex items-center justify-between"
            onClick={() => toggleDropdown("availablePlatforms")}
          >
            <span>
              {modalData.availablePlatforms && modalData.availablePlatforms.length > 0
                ? modalData.availablePlatforms.join(", ")
                : "Select platforms"}
            </span>
            <FaCaretDown className="text-gray-300" />
          </div>
          {openDropdown === "availablePlatforms" && (
            <div className="absolute z-10 mt-2 w-full bg-[#0A0A0B] max-h-48 overflow-y-auto rounded-2xl shadow-lg scrollbar-hide">
              {platformOptions.map((platform) => (
                <div
                  key={platform}
                  className="px-4 py-2 text-base text-white capitalize hover:bg-[#131314] cursor-pointer flex justify-between items-center"
                  onClick={() => togglePlatform(platform)}
                >
                  <span>{platform}</span>
                  {modalData.availablePlatforms?.includes(platform) && (
                    <FaCheck className="text-[#c088fb]" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* API Access Available (dropdown Yes/No) */}
        <div className="space-y-1 relative">
          <label className="text-[#F4F4F4] text-sm font-medium">API Access Available?</label>
          <div
            className="w-full py-3 px-4 bg-[#0A0A0B] text-gray-300 rounded-[68px] cursor-pointer flex items-center justify-between"
            onClick={() => toggleDropdown("apiAccess")}
          >
            <span>{modalData.apiAccess || "Yes or No"}</span>
            <FaCaretDown />
          </div>
          {openDropdown === "apiAccess" && (
            <div className="absolute z-10 mt-2 w-full bg-[#0A0A0B] max-h-48 overflow-y-auto rounded-2xl shadow-lg scrollbar-hide">
              {apiAccessOptions.map((option) => (
                <div
                  key={option}
                  className="px-4 py-2 text-base text-white hover:bg-[#131314] cursor-pointer capitalize"
                  onClick={() => handleSingleSelect("apiAccess", option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Integration Options (input) */}
        <div className="space-y-1">
          <label className="text-[#F4F4F4] text-sm font-medium">Integration Options</label>
          <input
            type="text"
            placeholder="e.g., Zapier, Slack, Shopify"
            className="rounded-[28px] bg-[#0a0a0b] placeholder:text-[#f4f4f4] text-[#f4f4f4] h-[56px] border-none focus:outline-none outline-none focus:ring-0 w-full px-4"
            value={modalData.integrationOptions || ""}
            onChange={(e) => handleInputChange("integrationOptions", e.target.value)}
          />
        </div>

        {/* Demo Video URL (input) */}
        <div className="space-y-1">
          <label className="text-[#F4F4F4] text-sm font-medium">Demo Video URL</label>
          <input
            type="text"
            placeholder="https://youtu.be/demo123"
            className="rounded-[28px] bg-[#0a0a0b] placeholder:text-[#f4f4f4] text-[#f4f4f4] h-[56px] border-none focus:outline-none outline-none focus:ring-0 w-full px-4"
            value={modalData.demoVideoUrl || ""}
            onChange={(e) => handleInputChange("demoVideoUrl", e.target.value)}
          />
        </div>
        </div>



        {/* Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={closeModal}
            className="px-[21px] py-2.5 text-sm md:text-base bg-transparent text-white border border-[#FFFFFF26] rounded-[25px] hover:bg-gray-800 hover:border-[#c088fb] hover:scale-105 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateClick}
            disabled={!isFormValid()}
            className={`px-[21px] py-2.5 text-sm md:text-base bg-[#C088FB] text-[#0A0A0B] rounded-[25px] transition-all ${
              isFormValid() ? "hover:scale-105" : "cursor-not-allowed opacity-50"
            }`}
          >
            Update Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondModal;
