import React from "react";
import RoleCombobox from "./RoleCombobox"; // Import the RoleCombobox component
import './FirstModal.css'
import Image from "next/image";

const FirstModal = ({ closeModal, openModal }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-[#000000] text-white rounded-[41px] p-[26px] shadow-xl w-[90%] max-w-3xl max-h-[637px] h-[90%] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-gray-700">
          <h2 className="text-xl md:text-2xl font-bold">
            CREATE CUSTOM INSTRUCTIONS
          </h2>
          <button
            onClick={closeModal}
            className="flex items-center justify-center"
          >
            <Image src={'/close-square.svg'} alt="X" width={58} height={58}/>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <p className="text-sm md:text-base text-gray-300">
            What do you want Voyex to know about you?
          </p>

          {/* Role Combobox */}
          <RoleCombobox />

          {/* Input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Describe Branding
              </label>
              <textarea
                className="w-full max-h-[130px] p-3 resize-none rounded-3xl bg-transparent border border-[#FFFFFF26] text-white focus:outline-none focus:ring focus:ring-[#c088fb]"
                rows="4"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Overview</label>
              <textarea
                className="w-full p-3 max-h-[130px] rounded-3xl border resize-none bg-transparent border-[#FFFFFF26] text-white focus:outline-none focus:ring focus:ring-[#c088fb]"
                rows="4"
              ></textarea>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Goals</label>
            <textarea
              className="w-full p-3 max-h-[130px] rounded-3xl border resize-none bg-transparent border-[#FFFFFF26] text-white focus:outline-none focus:ring focus:ring-[#c088fb]"
                rows="4"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Describe Challenges Faced
            </label>
            <textarea
              className="w-full p-3 max-h-[130px] rounded-3xl border resize-none bg-transparent border-[#FFFFFF26] text-white focus:outline-none focus:ring focus:ring-[#c088fb]"
              rows="4"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Preferred Tool
              </label>
              <select className="w-full py-3 px-4 max-h-[64px] bg-[#0A0A0B] text-gray-300 focus:outline-none focus:ring focus:ring-[#c088fb] rounded-[68px]">
                <option value="">Select Tools</option>
                <option value="Tool 1">Tool 1</option>
                <option value="Tool 2">Tool 2</option>
                <option value="Tool 3">Tool 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Preferred Framework (if applicable)
              </label>
              <select className="w-full py-3 px-4 max-h-[64px] bg-[#0a0a0b] text-gray-300 focus:outline-none focus:ring focus:ring-[#c088fb] rounded-[68px]">
                <option value="">Select Tools</option>
                <option value="Framework 1">Framework 1</option>
                <option value="Framework 2">Framework 2</option>
                <option value="Framework 3">Framework 3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex p-6 justify-between items-center">
          <button
            onClick={() => openModal('first')}
            className="px-[21px] py-2.5 text-sm md:text-base bg-transparent text-white border border-[#FFFFFF26] rounded-[25px] hover:bg-gray-800 focus:ring focus:ring-[#c088fb]"
          >
            Intelligence
          </button>
          <button
            onClick={() => openModal('second')}
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
