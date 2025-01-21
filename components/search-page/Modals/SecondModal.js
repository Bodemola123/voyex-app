import React from 'react';

const SecondModal = ({ closeModal, openModal }) => {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#000000] text-white rounded-lg w-3/4 sm:w-1/2 lg:w-1/3 p-6 relative">
        <button className="absolute top-4 right-4 text-white text-xl" onClick={closeModal}>&times;</button>
        <h2 className="text-xl font-bold mb-4">CREATE CUSTOM INSTRUCTIONS</h2>
        <p className="text-sm mb-4">How should Voyex respond?</p>

        <form className="space-y-4">
          {/* Form Inputs */}
          <div className="space-y-2">
            <label>Tone of Response</label>
            <select className="w-full bg-[#1d1d1f] border border-gray-500 rounded-lg px-3 py-2 text-sm">
              <option>Select Tone</option>
              {/* Other options */}
            </select>
          </div>
          <div className="space-y-2">
            <label>Format of Response</label>
            <select className="w-full bg-[#1d1d1f] border border-gray-500 rounded-lg px-3 py-2 text-sm">
              <option>Select Format</option>
              {/* Other options */}
            </select>
          </div>
          <div className="space-y-2">
            <label>Depth of Response</label>
            <select className="w-full bg-[#1d1d1f] border border-gray-500 rounded-lg px-3 py-2 text-sm">
              <option>Select Depth</option>
              {/* Other options */}
            </select>
          </div>
        </form>

        <div className="flex justify-between items-center mt-6">
          <button className="px-6 py-2 text-sm md:text-base bg-transparent text-white border border-gray-700 rounded-lg hover:bg-gray-800 focus:ring focus:ring-gray-500" onClick={() => openModal('first')}>
            Intelligence
          </button>
          <button className="text-white px-4 py-2 bg-[#C088FB] rounded-[25px]" onClick={() => openModal('third')}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondModal;
