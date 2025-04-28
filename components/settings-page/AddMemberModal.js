"use client";
import React, { useState } from "react";

const AddMemberModal = ({ onClose, onAddMember }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [accessLevel, setAccessLevel] = useState("");

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

  return (
    <div className="fixed top-0 left-0 w-full h-full inset-0 bg-[rgba(19,19,20,0.8)] flex items-center justify-center z-50">
      <div className="bg-[#1c1d1f] text-white rounded-[24px] p-8 w-[400px]">
        <h2 className="text-2xl font-semibold mb-6">Add Team Member</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label>
            Role:
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label>
            Access Level:
            <select
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#f4f4f4]"
            >
              <option value="Can Edit">Can Edit</option>
              <option value="Can View">Can View</option>
            </select>
          </label>
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-transparent text-white rounded-[25px] hover:bg-gray-600 border border-[#FFFFFF26] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#c088fb] text-white rounded-[25px] hover:bg-purple/70"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
