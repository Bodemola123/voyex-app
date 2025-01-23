import Image from 'next/image';
import React from 'react';
import '../../../app/globals.css';

const SecondModal = ({ closeModal, openModal }) => {
  // Common classes for select elements
  const selectClasses =
    "w-full bg-[#0a0a0b] rounded-[64px] h-[64px] px-3 py-2 text-base text-gray-300 focus:outline-none focus:ring focus:ring-[#c088fb]";

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

        {/* Form */}
        <form
          className="space-y-4"
          aria-describedby="modal-description"
        >
          {/* Tone of Response */}
          <div className="space-y-2">
            <label className="text-base font-medium" htmlFor="tone-select">
              Tone of Response
            </label>
            <select
              id="tone-select"
              className={selectClasses}
              defaultValue=""
            >
              <option value="" disabled>
                Select Tone
              </option>
              {/* Add other options here */}
            </select>
          </div>

          {/* Format of Response */}
          <div className="space-y-2">
            <label className="text-base font-medium" htmlFor="format-select">
              Format of Response
            </label>
            <select
              id="format-select"
              className={selectClasses}
              defaultValue=""
            >
              <option value="" disabled>
                Select Format
              </option>
              {/* Add other options here */}
            </select>
          </div>

          {/* Depth of Response */}
          <div className="space-y-2">
            <label className="text-base font-medium" htmlFor="depth-select">
              Depth of Response
            </label>
            <select
              id="depth-select"
              className={selectClasses}
              defaultValue=""
            >
              <option value="" disabled>
                Select Depth
              </option>
              {/* Add other options here */}
            </select>
          </div>
        </form>

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
