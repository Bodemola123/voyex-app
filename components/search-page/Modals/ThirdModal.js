import React from 'react';

const ThirdModal = ({ closeModal, openModal }) => {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#000000] text-white rounded-lg w-3/4 sm:w-1/2 lg:w-1/3 p-6 relative">
        <button className="absolute top-4 right-4 text-white text-xl" onClick={closeModal}>&times;</button>
        <h2 className="text-xl font-bold mb-4">VOYEX INTELLIGENCE</h2>
        <p className="text-sm mb-4">Voyex has stored your details for a personalized response. Feel free to delete changes.</p>

        <ul className="space-y-2 mb-6">
          <li className="flex justify-between items-center">
            <span>Henry Osuji specializes in UI/UX design.</span>
            <button className="text-red-500">&times;</button>
          </li>
          {/* Additional stored details */}
        </ul>

        <div className="flex justify-between items-center">
        <button className="px-6 py-2 text-sm md:text-base bg-transparent text-white border border-gray-700 rounded-lg hover:bg-gray-800 focus:ring focus:ring-gray-500" onClick={() => openModal('first')}>
            Intelligence
          </button>
          <button className="bg-red-600 text-white rounded-lg px-4 py-2">Cause Amnesia</button>
        </div>
      </div>
    </div>
  );
};

export default ThirdModal;
