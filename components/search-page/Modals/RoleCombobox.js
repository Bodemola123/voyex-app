import React, { useState } from "react";

const RoleCombobox = ({ selectedRoles, setSelectedRoles }) => {
  const techRoles = [
    "Product Designer",
    "User Researcher",
    "UI Designer",
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "AI Engineer",
    "DevOps Engineer",
    "Mobile Developer",
    "Full Stack Developer",
    "Cloud Architect",
    "Cybersecurity Specialist",
    "Software Engineer",
    "Machine Learning Engineer",
    "Data Engineer",
    "Blockchain Developer",
    "QA Engineer",
    "Network Engineer",
    "Systems Administrator",
    "Business Intelligence Analyst",
    "Technical Project Manager",
    "Embedded Systems Engineer",
    "AR/VR Developer",
    "Game Developer",
    "Site Reliability Engineer",
    "Database Administrator",
  ];
  

  const [inputValue, setInputValue] = useState("");
  const [filteredRoles, setFilteredRoles] = useState(techRoles);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter roles based on input
    setFilteredRoles(
      techRoles.filter(
        (role) =>
          role.toLowerCase().includes(value.toLowerCase()) &&
          !selectedRoles.includes(role)
      )
    );
  };

  const handleRoleSelect = (role) => {
    if (selectedRoles.length < 3 && !selectedRoles.includes(role)) {
      setSelectedRoles([...selectedRoles, role]);
      setInputValue("");
      setFilteredRoles(techRoles.filter((r) => !selectedRoles.includes(r)));
    }
  };

  const handleRoleRemove = (role) => {
    const updatedRoles = selectedRoles.filter((r) => r !== role);
    setSelectedRoles(updatedRoles);
    setFilteredRoles(
      techRoles.filter(
        (r) =>
          !updatedRoles.includes(r) &&
          r.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  };

  return (
    <div className="relative">
      <label className="block text-white mb-2">Role</label>
      {/* Selected Roles */}
      <div className="flex flex-wrap gap-2 mb-2 bg-[#0A0A0B] py-3 px-4 rounded-[68px]">
        {selectedRoles.map((role) => (
          <div
            key={role}
            className="flex items-center gap-2 bg-[#6b46c1] text-white text-sm px-3 py-1 rounded-full"
          >
            {role}
            <button
              onClick={() => handleRoleRemove(role)}
              className="text-white text-xs"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          className="flex-1 bg-transparent text-white focus:outline-none"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={
            selectedRoles.length < 3 ? "Select Roles" : "Maximum 3 roles"
          }
          disabled={selectedRoles.length >= 3}
        />
      </div>
      {/* Dropdown */}
      {inputValue && filteredRoles.length > 0 && (
        <ul className="absolute bg-[#1d1d1f] text-white w-full rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
          {filteredRoles.map((role) => (
            <li
              key={role}
              className="px-4 py-2 hover:bg-[#2a2a2e] cursor-pointer"
              onClick={() => handleRoleSelect(role)}
            >
              {role}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoleCombobox;
