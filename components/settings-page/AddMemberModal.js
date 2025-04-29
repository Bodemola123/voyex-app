"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaCaretDown } from "react-icons/fa";

const AddMemberModal = ({ onClose, onAddMember }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMember = {
      name: name || "N/A",
      email: email || "N/A",
      role: role || "Member",
      accessLevel: accessLevel || "Can View",
    };
    onAddMember(newMember);
  };

  // Check if all required fields are filled
  const isFormValid = name && email && role && accessLevel;

  return (
    <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)] flex items-center justify-center z-50">
      <div className="bg-[#000000] text-white rounded-[41px] p-[26px] shadow-xl w-[90%] max-w-md h-auto flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold">Add Team Member</h2>
          <button onClick={onClose} className="flex items-center justify-center">
            <Image src={"/close-square.svg"} alt="X" width={58} height={58} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-3xl bg-transparent border border-[#FFFFFF26] text-white outline-none focus:outline-none focus:ring-0"
          />
          
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-3xl bg-transparent border border-[#FFFFFF26] text-white outline-none focus:outline-none focus:ring-0"
          />

          <label className="text-sm font-medium">Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded-3xl bg-transparent border border-[#FFFFFF26] text-white outline-none focus:outline-none focus:ring-0"
          />

          <label className="text-sm font-medium">Access Level</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full text-base px-3 py-2 border border-[#FFFFFF26] rounded-3xl bg-[#0a0a0b] text-[#f4f4f4] focus:outline-none flex flex-row justify-between items-center"
            >
              {accessLevel || "Select Access Level"}
              <FaCaretDown />
            </button>
            {isOpen && (
              <div className="absolute left-0 mt-2 w-full bg-[#0a0a0b] rounded-3xl border border-[#FFFFFF26]">
                <button
                  type="button"
                  onClick={() => { setAccessLevel("Can Edit"); setIsOpen(false); }}
                  className="w-full text-left px-4 py-2 text-[#f4f4f4] hover:text-[#c088fb]"
                >
                  Can Edit
                </button>
                <button
                  type="button"
                  onClick={() => { setAccessLevel("Can View"); setIsOpen(false); }}
                  className="w-full text-left px-4 py-2 text-[#f4f4f4] hover:text-[#c088fb]"
                >
                  Can View
                </button>
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="flex py-6 items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-transparent text-white border border-[#FFFFFF26] rounded-[25px] hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className={`px-4 py-2 bg-[#C088FB] text-[#0A0A0B] rounded-[25px] focus:ring focus:ring-[#c088fb] ${!isFormValid ? "opacity-50" : ""}`}
            disabled={!isFormValid}
          >
            Add Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
