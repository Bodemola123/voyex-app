"use client";
import React, { useState, useEffect } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import AddMemberModal from "./AddMemberModal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

const TeamMemberTable = () => {
  const creator = {
    email: localStorage.getItem("orgEmail") || "N/A",
    role: "Creator",
    accessLevel: "Owner",
  };

  const [teamMembers, setTeamMembers] = useState([creator]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingMemberIndex, setEditingMemberIndex] = useState(null);
  const [editingMemberData, setEditingMemberData] = useState(null);
  const [loadingState, setLoadingState] = useState(null);

  const fetchMembers = async () => {
    const orgId = localStorage.getItem("entityId");
  
    if (!orgId) {
      console.error("No organization ID found in localStorage");
      return;
    }
  
    try {
      const response = await fetch(
        `https://f3y0bxd77g.execute-api.ap-southeast-2.amazonaws.com/default/voyex_role_based_access?org_id=${orgId}`
      );
      const data = await response.json();
  
      if (Array.isArray(data.members)) {
        const members = data.members.map((memberArray) => ({
          memberId: memberArray[0],
          email: memberArray[2],
          role: memberArray[3],
          accessLevel: memberArray[4],
        }));
        setTeamMembers([creator, ...members]);
      } else {
        console.error("Invalid members data structure:", data);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };
  
  useEffect(() => {
    fetchMembers();
  }, []);
  

  const openAddModal = () => {
    setIsEditMode(false);
    setEditingMemberIndex(null);
    setIsModalOpen(true);
  };

  const handleNewMember = (newMember) => {
    setTeamMembers((prev) => [...prev, newMember]);
    fetchMembers();
    setIsModalOpen(false);
  };

  const handleEditMember = (updatedMember) => {
    if (editingMemberIndex !== null) {
      const updatedMembers = [...teamMembers];
      updatedMembers[editingMemberIndex] = {
        ...updatedMembers[editingMemberIndex],
        ...updatedMember,
      };
      setTeamMembers(updatedMembers);
      toast.success("Member Updated Succesfully");
    }
    fetchMembers();
    setIsModalOpen(false);
    setEditingMemberIndex(null);
    setEditingMemberData(null);
  };

  const handleDelete = async (index) => {
    if (index === 0) return;

    const memberToDelete = teamMembers[index];
    setLoadingState(index);

    try {
      const response = await fetch(
        `https://f3y0bxd77g.execute-api.ap-southeast-2.amazonaws.com/default/voyex_role_based_access?member_id=${memberToDelete.memberId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete member");

      const updatedMembers = teamMembers.filter((_, idx) => idx !== index);
      fetchMembers();
      setTeamMembers(updatedMembers);
      toast.success("Member deleted");
    } catch (error) {
      toast.error("Failed to delete member. Please try again.");
    } finally {
      setLoadingState(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-11 py-7 rounded-3xl bg-secondary w-full">
      <h1 className="text-left font-bold text-base text-[#f4f4f4]">
        Team Members and Roles
      </h1>
      <div className="bg-[#1c1d1f] flex flex-col gap-2.5 rounded-2xl">
        <div className="flex justify-between w-full p-4">
          <h1 className="text-base font-bold text-[#f4f4f4]">Team Members</h1>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-card/20 text-[#f4f4f4] rounded-[36px]"
          >
            <IoMdPersonAdd />
            Add Member
          </button>
        </div>

        <table className="w-full text-center border-separate border-spacing-y-3">
          <thead>
            <tr>
              <th className="text-sm font-normal">Email</th>
              <th className="text-sm font-normal">Role</th>
              <th className="text-sm font-normal">Access Level</th>
              <th className="text-sm font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, index) => (
              <tr key={index}>
                <td className="text-sm font-bold">{member.email}</td>
                <td className="text-sm font-bold">{member.role}</td>
                <td className="text-transparent bg-clip-text bg-gradient-to-r from-[#C088FB] via-[#8E3EFF] to-[#8E3EFF] text-base font-bold">
                  {member.accessLevel}
                </td>
                <td className="flex justify-around items-center">
                  {index !== 0 && (
                    <>
                      <button
                        onClick={() => {
                          setIsEditMode(true);
                          setEditingMemberIndex(index);
                          setEditingMemberData(member);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-500 p-2 rounded-2xl"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-500 p-2 rounded-2xl flex items-center gap-2"
                        disabled={loadingState !== null && loadingState !== index}
                      >
                        {loadingState === index ? (
                          <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <AddMemberModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingMemberIndex(null);
            setEditingMemberData(null);
          }}
          onAddMember={handleNewMember}
          onEditMember={handleEditMember}
          isEdit={isEditMode}
          initialData={editingMemberData}
        />
      )}
    </div>
  );
};

export default TeamMemberTable;
