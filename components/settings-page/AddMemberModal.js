"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaCaretDown } from "react-icons/fa";
import { toast } from "react-toastify";

const AddMemberModal = ({ onClose, onAddMember, onEditMember, isEdit = false, initialData = {} }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && initialData) {
      setEmail(initialData.email || "");
      setRole(initialData.role || "");
      setAccessLevel(initialData.accessLevel || "");
    }
  }, [isEdit, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !role || !accessLevel) return;

    setLoading(true);
    const orgId = localStorage.getItem("entityId");

    const memberPayload = {
      org_id: orgId,
      user_email: email,
      role: role,
      access_level: accessLevel,
    };

    try {
      if (isEdit) {
        const response = await fetch(
          `https://f3y0bxd77g.execute-api.ap-southeast-2.amazonaws.com/default/voyex_role_based_access`,
          {
            method: "PUT", // Assuming PUT for update — change if your API uses PATCH
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...memberPayload, member_id: initialData.memberId }),
          }
        );
        if (!response.ok) throw new Error("Failed to update member");
        onEditMember(memberPayload);
      } else {
        const res = await fetch(
          "https://f3y0bxd77g.execute-api.ap-southeast-2.amazonaws.com/default/voyex_role_based_access",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(memberPayload),
          }
        );
        if (!res.ok) throw new Error("Failed to add member");
        toast.success("Member Added Successfully")
        onAddMember(memberPayload);
      }

      onClose();
    } catch (err) {
      console.error("Submission error:", err);
      toast.warning("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email && role && accessLevel;

  return (
    <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)] flex items-center justify-center z-50">
      <div className="bg-[#000000] text-white rounded-[41px] p-[26px] shadow-xl w-[90%] max-w-md h-auto flex flex-col overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold">
            {isEdit ? "Edit Team Member" : "Add Team Member"}
          </h2>
          <button onClick={onClose}>
            <Image src={"/close-square.svg"} alt="X" width={58} height={58} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isEdit}
            className="w-full p-3 rounded-3xl bg-transparent border border-[#FFFFFF26] text-white outline-none"
            required
          />

          <label className="text-sm font-medium">Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded-3xl bg-transparent border border-[#FFFFFF26] text-white outline-none"
            required
          />

          <label className="text-sm font-medium">Access Level</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full text-base px-3 py-2 border border-[#FFFFFF26] rounded-3xl bg-[#0a0a0b] text-[#f4f4f4] focus:outline-none flex justify-between items-center"
            >
              {accessLevel || "Select Access Level"}
              <FaCaretDown />
            </button>
            {isOpen && (
              <div className="absolute left-0 mt-2 w-full bg-[#0a0a0b] rounded-3xl border border-[#FFFFFF26]">
                {["Can Edit", "Can View"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => {
                      setAccessLevel(level);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-[#f4f4f4] hover:text-[#c088fb]"
                  >
                    {level}
                  </button>
                ))}
              </div>
            )}
          </div>
        </form>

        <div className="flex py-6 items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-transparent text-white border border-[#FFFFFF26] rounded-[25px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className={`px-4 py-2 bg-[#C088FB] text-[#0A0A0B] rounded-[25px] ${
              !isFormValid || loading ? "opacity-50" : ""
            }`}
            disabled={!isFormValid || loading}
          >
            {loading ? (isEdit ? "Updating..." : "Adding...") : isEdit ? "Update Member" : "Add Member"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
