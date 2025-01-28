import Image from 'next/image';
import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import '../../../app/globals.css';

const SecondModal = ({ closeModal, openModal }) => {
  // State for dropdown menus
  const [showToneDropdown, setShowToneDropdown] = useState(false);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [showDepthDropdown, setShowDepthDropdown] = useState(false);

  const [selectedTone, setSelectedTone] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedDepth, setSelectedDepth] = useState('');

  // Toggle dropdown visibility
  const toggleDropdown = (dropdown) => {
    if (dropdown === 'tone') {
      setShowToneDropdown(!showToneDropdown);
    } else if (dropdown === 'format') {
      setShowFormatDropdown(!showFormatDropdown);
    } else if (dropdown === 'depth') {
      setShowDepthDropdown(!showDepthDropdown);
    }
  };

  // Handle selection of an item from dropdown
  const handleDropdownSelect = (item, type) => {
    if (type === 'tone') {
      setSelectedTone(item);
      setShowToneDropdown(false);
    } else if (type === 'format') {
      setSelectedFormat(item);
      setShowFormatDropdown(false);
    } else if (type === 'depth') {
      setSelectedDepth(item);
      setShowDepthDropdown(false);
    }
  };

  // Dropdown options
  const toneOptions = ['Friendly', 'Professional', 'Neutral'];
  const formatOptions = ['Text', 'Code', 'List'];
  const depthOptions = ['Brief', 'Detailed', 'In-depth'];

  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50"
      aria-labelledby="second-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#000000] text-white rounded-lg w-[794px] p-[26px] relative">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2
            id="second-modal-title"
            className="text-2xl font-bold"
          >
            CREATE CUSTOM INSTRUCTIONS
          </h2>
          <button
            onClick={closeModal}
            aria-label="Close modal"
            className="flex items-center justify-center"
          >
            <Image src={'/close-square.svg'} alt="Close" width={58} height={58} />
          </button>
        </div>

        <p
          className="text-base font-medium mb-4"
          id="modal-description"
        >
          How should Voyex respond?
        </p>

        {/* Custom Dropdowns */}
        <div className="space-y-6">
          {/* Tone of Response */}
          <div className="relative">
            <label className="text-base font-medium mb-2 block" htmlFor="tone-dropdown">
              Tone of Response
            </label>
            <div
              className="w-full py-3 px-4 bg-[#0A0A0B] text-gray-300 rounded-[68px] cursor-pointer flex items-center justify-between"
              onClick={() => toggleDropdown('tone')}
            >
              <span>{selectedTone || 'Select Tone'}</span>
              <FaCaretDown />
            </div>
            {showToneDropdown && (
              <ul className="absolute w-full bg-[#0A0A0B] text-gray-300 rounded-xl mt-2 z-10">
                {toneOptions.map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 cursor-pointer hover:bg-[#c088fb]"
                    onClick={() => handleDropdownSelect(option, 'tone')}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Format of Response */}
          <div className="relative">
            <label className="text-base font-medium mb-2 block" htmlFor="format-dropdown">
              Format of Response
            </label>
            <div
              className="w-full py-3 px-4 bg-[#0A0A0B] text-gray-300 rounded-[68px] cursor-pointer flex items-center justify-between"
              onClick={() => toggleDropdown('format')}
            >
              <span>{selectedFormat || 'Select Format'}</span>
              <FaCaretDown />
            </div>
            {showFormatDropdown && (
              <ul className="absolute w-full bg-[#0A0A0B] text-gray-300 rounded-xl mt-2 z-10">
                {formatOptions.map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 cursor-pointer hover:bg-[#c088fb]"
                    onClick={() => handleDropdownSelect(option, 'format')}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Depth of Response */}
          <div className="relative">
            <label className="text-base font-medium mb-2 block" htmlFor="depth-dropdown">
              Depth of Response
            </label>
            <div
              className="w-full py-3 px-4 bg-[#0A0A0B] text-gray-300 rounded-[68px] cursor-pointer flex items-center justify-between"
              onClick={() => toggleDropdown('depth')}
            >
              <span>{selectedDepth || 'Select Depth'}</span>
              <FaCaretDown />
            </div>
            {showDepthDropdown && (
              <ul className="absolute w-full bg-[#0A0A0B] text-gray-300 rounded-xl mt-2 z-10">
                {depthOptions.map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 cursor-pointer hover:bg-[#c088fb]"
                    onClick={() => handleDropdownSelect(option, 'depth')}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            className="px-[21px] py-2.5 text-sm md:text-base bg-transparent text-white border border-[#FFFFFF26] rounded-[25px] hover:bg-gray-800 focus:ring focus:ring-[#c088fb]"
            onClick={() => openModal('first')}
          >
            Intelligence
          </button>
          <button
            className="px-[21px] py-2.5 text-sm md:text-base bg-[#C088FB] text-[#0A0A0B] rounded-[25px] focus:ring focus:ring-[#c088fb]"
            onClick={() => openModal('third')}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondModal;
