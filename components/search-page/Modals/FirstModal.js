import React, { useState } from "react";
import RoleCombobox from "./RoleCombobox"; // Import the RoleCombobox component
import Image from "next/image";
import { FaCaretDown } from "react-icons/fa";

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

  // State for the dropdown menus
  const [showToolDropdown, setShowToolDropdown] = useState(false);
  const [showFrameworkDropdown, setShowFrameworkDropdown] = useState(false);
  const [selectedTool, setSelectedTool] = useState(modalData.preferredTool || "");
  const [selectedFramework, setSelectedFramework] = useState(modalData.preferredFramework || "");

  // Toggle dropdown visibility
  const toggleDropdown = (dropdown) => {
    if (dropdown === "tool") {
      setShowToolDropdown(!showToolDropdown);
    } else if (dropdown === "framework") {
      setShowFrameworkDropdown(!showFrameworkDropdown);
    }
  };

  // Handle selection of an item from dropdown
  const handleDropdownSelect = (item, type) => {
    if (type === "tool") {
      setSelectedTool(item);
      setShowToolDropdown(false);
      setModalData((prev) => ({ ...prev, preferredTool: item }));
    } else if (type === "framework") {
      setSelectedFramework(item);
      setShowFrameworkDropdown(false);
      setModalData((prev) => ({ ...prev, preferredFramework: item }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#000000] text-white rounded-[41px] p-[26px] shadow-xl w-[90%] max-w-3xl max-h-[637px] h-[90%] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center border-gray-700">
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <p className="text-sm md:text-base text-gray-300">
            What do you want Voyex to know about you?
          </p>

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
            <div className="relative">
              <label className="block text-sm text-gray-400 mb-2">Preferred Tool</label>
              <div className="relative">
                <div
                  className="w-full py-3 px-4 bg-[#0A0A0B] text-gray-300 rounded-[68px] cursor-pointer flex items-center justify-between"
                  onClick={() => toggleDropdown("tool")}
                >
                  <span>{selectedTool || "Select Tool"}</span>
                  <FaCaretDown />
                </div>

                {showToolDropdown && (
                  <ul className="absolute w-full bg-[#0A0A0B] text-gray-300 rounded-xl mt-2">
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-[#c088fb]"
                      onClick={() => handleDropdownSelect("Tool 1", "tool")}
                    >
                      Tool 1
                    </li>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-[#c088fb]"
                      onClick={() => handleDropdownSelect("Tool 2", "tool")}
                    >
                      Tool 2
                    </li>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-[#c088fb]"
                      onClick={() => handleDropdownSelect("Tool 3", "tool")}
                    >
                      Tool 3
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* Custom Dropdown for Preferred Framework */}
            <div className="relative">
              <label className="block text-sm text-gray-400 mb-2">
                Preferred Framework (if applicable)
              </label>
              <div className="relative">
                <div
                  className="w-full py-3 px-4 bg-[#0A0A0B] text-gray-300 rounded-[68px] cursor-pointer flex items-center justify-between"
                  onClick={() => toggleDropdown("framework")}
                >
                  <span>{selectedFramework || "Select Framework"}</span>
                  <FaCaretDown />
                </div>

                {showFrameworkDropdown && (
                  <ul className="absolute w-full bg-[#0A0A0B] text-gray-300 rounded-xl mt-2">
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-[#c088fb]"
                      onClick={() => handleDropdownSelect("Framework 1", "framework")}
                    >
                      Framework 1
                    </li>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-[#6b46c1]"
                      onClick={() => handleDropdownSelect("Framework 2", "framework")}
                    >
                      Framework 2
                    </li>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-[#c088fb]"
                      onClick={() => handleDropdownSelect("Framework 3", "framework")}
                    >
                      Framework 3
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex p-6 justify-between items-center">
          <button
            onClick={() => openModal("first")}
            className="px-[21px] py-2.5 text-sm md:text-base bg-transparent text-white border border-[#FFFFFF26] rounded-[25px] hover:bg-gray-800 focus:ring focus:ring-[#c088fb]"
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
