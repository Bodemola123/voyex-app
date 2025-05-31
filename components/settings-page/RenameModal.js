import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

const RenameModal = ({ onClose, onSuccess }) => {
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

const handleSave = async () => {
  const entityId = localStorage.getItem("entityId");
  const userId = localStorage.getItem("userType");
  const orgId = localStorage.getItem("orgType");
  const access_token = localStorage.getItem("access_token");

  console.log("Access Token:", access_token);
  console.log("entityId:", entityId);
  console.log("userType:", userId);
  console.log("orgType:", orgId);

  if (!entityId || !access_token || (!userId && !orgId)) {
    toast.warning("Missing credentials.");
    return;
  }

  setLoading(true);

  try {
    if (userId) {
      console.log("🚀 Updating user");

      // Fetch user details
      const res = await fetch(`https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api?user_id=${entityId}`);
      const userData = await res.json();
      console.log("✅ Fetched user data:", userData);

      const payload = {
        ...userData,
        user_id: parseInt(entityId),
        fullname: newName,
        access_token,
      };
      console.log("📦 User Update Payload:", payload);

      const putRes = await fetch(`https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const putData = await putRes.json();
      console.log("📬 User Update Response:", putData);

      if (!putRes.ok) throw new Error("User update failed");

      localStorage.setItem("fullName", newName);
      localStorage.setItem("firstName", newName.trim().split(" ")[0]);

    } else {
      console.log("🏢 Updating organization");

      const res = await fetch(`https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api?org_id=${entityId}`);
      const orgData = await res.json();
      console.log("✅ Fetched org data:", orgData);

      const payload = {
        org_id: parseInt(entityId),
        organization_name: newName,
        industry: orgData.industry || "",
        location: orgData.location || "",
        website_url: orgData.website_url || "",
        poc: orgData.poc || "",
        logo_url: orgData.logo_url || "",
        social_media: orgData.social_media || { twitter: "", linkedin: "" },
        operational_details: orgData.operational_details || {
          target_auience: "",
          service_offered: "",
          tech_used: ""
        },
        access_token,
      };
      console.log("📦 Org Update Payload:", payload);

      const putRes = await fetch(`https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const putData = await putRes.json();
      console.log("📬 Org Update Response:", putData);

      if (!putRes.ok) throw new Error("Org update failed");

      localStorage.setItem("orgName", newName);
    }

    toast.success("Name Changed Successfully");
    onSuccess(); // <-- trigger update
    onClose();
  } catch (err) {
    console.error("❌ Rename failed:", err);
    toast.error("An error occurred while renaming. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)] flex items-center justify-center z-50">
      <div className="bg-[#1C1D1F] border border-[#D0D5DD1A] text-white rounded-[41px] p-6 w-[482px] relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Rename</h2>
          <button onClick={onClose}>
            <Image src={"/close-square.svg"} alt="Close" width={58} height={58} />
          </button>
        </div>

        {/* Input */}
        <input
          className="w-full px-4 py-2 rounded-[25px] bg-[#1c1c1c] border border-[#FFFFFF26] text-white mb-6 outline-none"
          placeholder="Enter new name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          disabled={loading}
        />

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-transparent text-white rounded-[25px] hover:bg-gray-600 border border-[#FFFFFF26] transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-[#c088fb] text-[#0a0a0b] rounded-[25px] hover:bg-[#a86af0] transition"
            disabled={loading || !newName.trim()}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameModal;
