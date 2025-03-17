import React from 'react';
import Image from 'next/image';

const ClearAll = ({ onClose, onClearAll }) => {
  return (
    <div className="fixed inset-0 bg-[#111111]/30 flex items-center justify-center z-50">
      <div className="bg-[#000000] text-white rounded-[41px] w-[482px] p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Clear Entire Memory?</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center"
          >
            <Image src={'/close-square.svg'} alt="Close" width={58} height={58} />
          </button>
        </div>
        
        {/* Message */}
        <p className="text-lg mb-6">
          Voyex will forget everything it has remembered from your chats. This cannot be undone.{' '}
          <a href="#" className="text-[#c088fb] underline">Learn more</a>.
        </p>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            className="px-5 py-2.5 bg-transparent text-white rounded-[25px] border border-[#FFFFFF26] transition hover:scale-105"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2.5 bg-[#ff1e1e] text-[#0a0a0b] rounded-[25px] hover:bg-red-700  transition hover:scale-105"
            onClick={onClearAll}
          >
            Yes, Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearAll;
