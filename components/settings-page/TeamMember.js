"use client";
import React, { useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import AddMemberModal from "./AddMemberModal";

const TeamMemberTable = () => {
  // Initial team member data (the first member is non-deletable)
  const initialData = [
    {
      name: localStorage.getItem("poc") || "No name in database",
      email: localStorage.getItem("orgEmail") || "N/A",
      role: "Creator",
      accessLevel: "Owner",
    },
  ];

  const [teamMembers, setTeamMembers] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const handleAddMember = () => {
    setIsModalOpen(true);
  };

  // Function to add a new team member
  const handleNewMember = (newMember) => {
    setTeamMembers((prevState) => [...prevState, newMember]);
    setIsModalOpen(false); // Close modal after adding member
  };

  // Function to delete a member (only for added members)
  const handleDelete = (index) => {
    if (index !== 0) {
      const updatedMembers = [...teamMembers];
      updatedMembers.splice(index, 1);
      setTeamMembers(updatedMembers);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-11 py-7 rounded-3xl bg-secondary w-full">
    <h1 className="text-left font-bold text-base text-[#f4f4f4]"> Team Members and Roles</h1>
    <div className="bg-[#1c1d1f] flex flex-col gap-2.5 rounded-2xl">
            {/* Team Members Header */}
            <div className="flex justify-between w-full p-4">
        <h1 className="text-base font-bold text-[#f4f4f4]">Team Members</h1>
        <button
          onClick={handleAddMember}
          className="flex items-center gap-2 px-4 py-2 bg-card/20 text-[#f4f4f4] rounded-[36px]"
        >
          <IoMdPersonAdd />
          Add Member
        </button>
      </div>

      {/* Team Members Table */}
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="text-sm font-normal ">Name</th>
            <th className="text-sm font-normal ">Email</th>
            <th className="text-sm font-normal ">Role</th>
            <th className="text-sm font-normal ">Access Level</th>
            <th className="text-sm font-normal ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, index) => (
            <tr key={index}>
              <td className="text-sm font-bold">{member.name}</td>
              <td className="text-sm font-bold">{member.email}</td>
              <td className="text-sm font-bold">{member.role}</td>
              <td className="bg-[#C088FB33] p-2 rounded-[10.5px] gap-2 flex flex-row text-transparent bg-clip-text bg-gradient-to-r from-[#C088FB] via-[#8E3EFF] to-[#8E3EFF] text-base font-bold">{member.accessLevel}</td>
              <td>
                {index !== 0 && (
                  <button
                  id="settings_delete_member"
                    onClick={() => handleDelete(index)}
                    className="text-red-500 p-2 rounded-2xl"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


      {/* Add Member Modal */}
      {isModalOpen && (
        <AddMemberModal
          onClose={() => setIsModalOpen(false)}
          onAddMember={handleNewMember}
        />
      )}
    </div>
  );
};

export default TeamMemberTable;
