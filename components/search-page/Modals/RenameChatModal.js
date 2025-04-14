// components/RenameChatModal.js
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const RenameChatModal = ({ currentName, onClose, onRename }) => {
  const [newName, setNewName] = useState(currentName);

  useEffect(() => {
    setNewName(currentName); // Reset input when modal opens
  }, [currentName]);

  return (
    <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)] flex items-center justify-center z-50">
      <div className="bg-[#000000] text-white rounded-[41px] p-6 w-[482px] relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Rename Chat</h2>
          <button onClick={onClose}>
            <Image src={'/close-square.svg'} alt="Close" width={58} height={58} />
          </button>
        </div>
        {/* Input */}
        <input
          className="w-full px-4 py-2 rounded-[25px] bg-[#1c1c1c] border border-[#FFFFFF26] text-white mb-6 outline-none"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new chat name"
        />
        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-transparent text-white rounded-[25px] hover:bg-gray-600 border border-[#FFFFFF26] transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onRename(newName)}
            className="px-5 py-2.5 bg-[#c088fb] text-[#0a0a0b] rounded-[25px] hover:bg-[#a86af0] transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameChatModal;
