// components/DeleteChatModal.js
import React from 'react';
import Image from 'next/image';

const DeleteChatModal = ({ currentTitle, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)] flex items-center justify-center z-50">
      <div className="bg-[#000000] text-white rounded-[41px] p-6 w-[482px] relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Delete Chat?</h2>
          <button onClick={onClose}>
            <Image src={'/close-square.svg'} alt="Close" width={58} height={58} />
          </button>
        </div>

        {/* Content */}
        <p className="mb-6 text-lg">
          Are you sure you want to delete the chat &quot;
          <span className="font-bold">{currentTitle}</span>
          &quot;? This cannot be undone.
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
  onClick={(e) => {
    e.stopPropagation();
    onConfirm();
  }}
            className="px-5 py-2.5 bg-[#ff1e1e] text-[#0a0a0b] rounded-[25px] hover:bg-red-700 transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteChatModal;
