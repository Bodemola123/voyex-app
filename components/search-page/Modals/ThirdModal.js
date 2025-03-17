import Image from 'next/image';
import React, { useState } from 'react';
import { CiTrash } from 'react-icons/ci';
import ClearAll from './ClearAll';
import DeleteMemory from './DeleteMemory';

const ThirdModal = ({ closeModal, openModal }) => {
  const [storedDetails, setStoredDetails] = useState([
    "Henry Osuji worked on a landing page UI for a carbon data collection company and used early-stage AI models.",
    "Name is Henry Osuji.",
    "Henry Osuji has 3+ years of experience in UI/UX design.",
    "Henry Osuji's previous company was Prodigal AI.",
    "Henry Osuji specializes in Figma, user experience design, user interface design, prototyping.",
    "Is sourcing an archaeology research funding form with a Web3 context, naming the project 'ArtifactHub'.",
    "Search for Roles",
  ]);

  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);
  const [isDeleteMemoryOpen, setIsDeleteMemoryOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  // Function to remove a specific detail
  const removeDetail = (index) => {
    setStoredDetails((prevDetails) =>
      prevDetails.filter((_, i) => i !== index)
    );
    setIsDeleteMemoryOpen(false); // Close delete memory modal after deletion
  };

  const handleClearAll = () => {
    setStoredDetails([]); // Clear all details
    setIsClearAllModalOpen(false); // Close the modal
  };

  const handleCloseClearAll = () => {
    setIsClearAllModalOpen(false);
  };

  const handleOpenDeleteMemory = (detail) => {
    setSelectedDetail(detail);
    setIsDeleteMemoryOpen(true);
  };

  const handleCloseDeleteMemory = () => {
    setIsDeleteMemoryOpen(false);
    setSelectedDetail(null);
  };

  return (
    <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)]  flex items-center justify-center z-50">
      <div className="bg-[#000000] text-white rounded-[41px] w-9/12 p-[27px] relative">
        {/* Header */}
        <div className="flex justify-between items-center border-gray-700">
          <h2 className="text-2xl font-bold">VOYEX INTELLIGENCE</h2>
          <button onClick={closeModal} className="flex items-center justify-center">
            <Image src={'/close-square.svg'} alt="X" width={58} height={58} />
          </button>
        </div>
        <p className="text-sm mb-6">
          Voyex has stored your details for a personalized response. Feel free to <span className="underline">delete changes</span>.
        </p>

        <ul className="space-y-4 mb-6 overflow-y-scroll">
          {storedDetails.map((detail, index) => (
            <li
              key={index}
              className="flex justify-between items-center h-[44px] hover:bg-[#c088fb] md:text-base"
            >
              <span className="px-3">{detail}</span>
              <button
                className="text-[#2d2d2d] hover:text-red-500 text-[24px] px-3"
                onClick={() => handleOpenDeleteMemory({ detail, index })}
                aria-label="Remove detail"
              >
                <CiTrash />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex justify-end items-center gap-4">
          <button
            className="bg-[#ff1e1e] text-[#0a0a0b] font-medium rounded-3xl border border-[#FFFFFF26] px-[21px] py-2.5 hover:bg-red-700 hover:scale-105 transition-all"
            onClick={() => setIsClearAllModalOpen(true)}
          >
            Cause Amnesia
          </button>
        </div>

        {isClearAllModalOpen && (
          <ClearAll onClose={handleCloseClearAll} onClearAll={handleClearAll} />
        )}

        {isDeleteMemoryOpen && selectedDetail && (
          <DeleteMemory
            detail={selectedDetail}
            onClose={handleCloseDeleteMemory}
            onDelete={() => removeDetail(selectedDetail.index)}
          />
        )}
      </div>
    </div>
  );
};

export default ThirdModal;
