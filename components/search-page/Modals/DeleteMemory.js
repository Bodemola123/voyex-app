import React from 'react';
import Image from 'next/image';

const DeleteMemory = ({ detail, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-[#111111]/30 flex items-center justify-center z-50">
      <div className="bg-[#000000] text-white rounded-[41px] p-6 w-[482px] relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Delete Memory?</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center"
          >
            <Image src={'/close-square.svg'} alt="Close" width={58} height={58} />
          </button>
        </div>
        {/* Content */}
        <p className="mb-6 text-lg">
          Voyex will forget &quot;<span className="font-bold">{detail.detail}</span>&quot;. This cannot be undone.{" "}
          <a href="#" className="text-[#c088fb] underline">
            Learn more
          </a>
        </p>
        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-transparent text-white rounded-[25px] hover:bg-gray-600 border border-[#FFFFFF26] transition"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-5 py-2.5 bg-[#ff1e1e] text-[#0a0a0b] rounded-[25px] hover:bg-red-700  transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMemory;
