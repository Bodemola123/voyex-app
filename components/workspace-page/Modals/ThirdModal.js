"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaCaretDown, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const regions = ["North America", "Europe", "Asia", "South America", "Africa", "Oceania"];

function ThirdModal({ closeModal, openModal, modalData, setModalData }) {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (type) => {
    setDropdownOpen(dropdownOpen === type ? null : type);
  };

  const toggleRegion = (region) => {
    const current = modalData.regionsAvailable || [];
    const updated = current.includes(region)
      ? current.filter((r) => r !== region)
      : [...current, region];
setModalData({
  ...modalData,
  regionsAvailable: updated,
});

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)] flex items-center justify-center z-50">
      <div
        className="bg-[#1c1d1f] text-white rounded-[41px] p-[26px] shadow-xl w-[90%] max-w-3xl max-h-[637px] flex flex-col gap-[29px]"
        ref={dropdownRef}
      >
        <div className="flex flex-row gap-4 items-center justify-center">
          <div className="bg-[#3D324B] px-2.5 py-1.5 rounded-[23.74px] text-sm font-black text-[#C088FB] text-center">
              <p>1</p>
          </div>
          <div className="bg-[#3D324B] px-2.5 py-1.5 rounded-[23.74px] text-sm font-black text-[#C088FB] text-center">
              <p>2</p>
          </div>
            <div className="flex flex-row gap-1.5 justify-center items-center">
            <div className="bg-[#C088FB] px-2.5 py-1.5 rounded-[23.74px] text-sm font-black text-[#0d0d0d] text-center">
              <p>3</p>
            </div>
            <p className="text-sm font-medium text-[#f4f4f4]">Contact Info</p>
          </div>
          <div className="bg-[#3D324B] px-2.5 py-1.5 rounded-[23.74px] text-sm font-black text-[#C088FB] text-center">
              <p>4</p>
          </div>
        </div>
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Support & Contact Info</h2>
          <button onClick={closeModal}>
            <Image src="/close-square.svg" alt="Close" width={58} height={58} />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-2 overflow-y-auto px-1">
          {[
            { label: "Support Email", name: "supportEmail" },
            { label: "Help Center URL", name: "helpCenterUrl" },
            { label: "Contact Person Name", name: "contactPersonName" },
            { label: "Contact Person Email", name: "contactPersonEmail" },
            { label: "Twitter URL", name: "twitterUrl" },
            { label: "LinkedIn URL", name: "linkedinUrl" },
            { label: "Discord URL", name: "discordUrl" },
            { label: "Launch Date", name: "launchDate", type: "date" },
            { label: "Compliance Certifications", name: "complianceCertifications" }
          ].map(({ label, name, type }) => (
            <div key={name} className="space-y-1">
              <label className="text-[#F4F4F4] text-sm font-medium">{label}</label>
              <input
                type={type || "text"}
                name={name}
                placeholder={label}
                className="rounded-[28px] bg-[#0a0a0b] placeholder:text-[#f4f4f4] text-[#f4f4f4] h-[56px] w-full px-4 border-none focus:outline-none focus:ring-0"
                value={modalData[name] || ""}
                onChange={handleInputChange}
              />
            </div>
          ))}

          {/* Regions Dropdown Multi-select */}
          <div className="space-y-1 relative">
            <label className="text-[#F4F4F4] text-sm font-medium">Regions Available</label>
            <div
              className="w-full py-3 px-4 bg-[#0A0A0B] text-[#f4f4f4] rounded-[68px] cursor-pointer flex items-center justify-between"
              onClick={() => toggleDropdown("regionsAvailable")}
            >
              <span>
                {modalData.regionsAvailable?.length > 0
                  ? modalData.regionsAvailable.join(", ")
                  : "Select regions"}
              </span>
              <FaCaretDown className="text-gray-300" />
            </div>
            {dropdownOpen === "regionsAvailable" && (
              <div className="absolute z-10 mt-2 w-full bg-[#0A0A0B] max-h-48 overflow-y-auto rounded-2xl shadow-lg scrollbar-hide">
                {regions.map((region) => (
                  <div
                    key={region}
                    className="px-4 py-2 text-base text-white capitalize hover:bg-[#131314] cursor-pointer flex justify-between items-center"
                    onClick={() => toggleRegion(region)}
                  >
                    <span>{region}</span>
                    {modalData.regionsAvailable?.includes(region) && (
                      <FaCheck className="text-[#c088fb]" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <button
            onClick={closeModal}
            className="px-[21px] py-2.5 text-sm md:text-base bg-transparent text-white border border-[#FFFFFF26] rounded-[25px] hover:bg-gray-800 hover:border-[#c088fb] hover:scale-105 transition-all"
          >
            Cancel
          </button>
<button
onClick={() => {
  const {
    supportEmail,
    helpCenterUrl,
    contactPersonName,
    contactPersonEmail,
    twitterUrl,
    linkedinUrl,
    discordUrl,
    launchDate,
    complianceCertifications,
  } = modalData || {};

  // Helper regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;

  // Field-specific validations
  if (!emailRegex.test(supportEmail)) {
    toast.error("Please enter a valid Support Email.");
    return;
  }

  if (!urlRegex.test(helpCenterUrl)) {
    toast.error("Please enter a valid Help Center URL.");
    return;
  }

  if (!contactPersonName?.trim()) {
    toast.error("Please enter the Contact Person's Name.");
    return;
  }

  if (!emailRegex.test(contactPersonEmail)) {
    toast.error("Please enter a valid Contact Person Email.");
    return;
  }

  if (twitterUrl && !urlRegex.test(twitterUrl)) {
    toast.error("Please enter a valid Twitter URL.");
    return;
  }

  if (linkedinUrl && !urlRegex.test(linkedinUrl)) {
    toast.error("Please enter a valid LinkedIn URL.");
    return;
  }

  if (discordUrl && !urlRegex.test(discordUrl)) {
    toast.error("Please enter a valid Discord URL.");
    return;
  }

  if (!launchDate) {
    toast.error("Please select a Launch Date.");
    return;
  }

  if (!complianceCertifications?.trim()) {
    toast.error("Please enter Compliance Certifications.");
    return;
  }
      if (
      !supportEmail ||
      !launchDate ||
      !contactPersonEmail ||
      !contactPersonName ||
      !complianceCertifications
    ) {
      toast.error("Please fill in all the required fields before continuing.");
      return;
    }

  // All checks passed
  openModal();
}}

  className="px-[21px] py-2.5 text-sm md:text-base bg-[#C088FB] text-[#0A0A0B] rounded-[25px] hover:scale-105 transition-all"
>
  Save & Continue
</button>

        </div>
      </div>
    </div>
  );
}

export default ThirdModal;
