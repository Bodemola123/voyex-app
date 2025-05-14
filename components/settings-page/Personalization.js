"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import Image from "next/image";

function Personalization() {
  const [userEmail, setUserEmail] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [isOrganization, setIsOrganization] = useState(false);

    const [role, setRole] = useState("None");
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const savedRole = localStorage.getItem("role");
        if (savedRole) {
          setRole(savedRole);
        }
      }
    }, []);
    const [accessLevel, setAccessLevel] = useState("None");
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const savedAccessLevel = localStorage.getItem("accessLevel");
        if (savedAccessLevel) {
          setAccessLevel(savedAccessLevel);
        }
      }
    }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUserEmail = localStorage.getItem("userEmail");
      const savedOrgEmail = localStorage.getItem("orgEmail");
      const savedFirstName = localStorage.getItem("firstName");
      const savedOrgName = localStorage.getItem("orgName");
      const orgType = localStorage.getItem("orgType");
      const userType = localStorage.getItem("userType");

      if (savedUserEmail) setUserEmail(savedUserEmail);
      if (savedOrgEmail) setOrgEmail(savedOrgEmail);
      if (savedFirstName) setFirstName(savedFirstName);
      if (savedOrgName) setOrgName(savedOrgName);

      if (orgType) {
        setIsOrganization(true);
      } else if (userType) {
        setIsOrganization(false);
      }
    }
  }, []);

  // Set name to display based on type, with fallbacks
  const displayName = isOrganization
    ? orgName || "Organization Name"
    : firstName || "Username";

  const displayEmail = isOrganization
    ? orgEmail || "organization@example.com"
    : userEmail || "user@example.com";

  return (
    <div className="w-full rounded-[25px] py-7 px-11 bg-secondary mb-9">
      <h1 className="text-fontlight text-base font-normal capitalize">
        {isOrganization ? "Organization info" : "personalization"}
      </h1>
      <Separator className="my-5 bg-[#6D6D6D]" />

      {/* Avatar / Logo */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-normal text-fontlight">
            {isOrganization ? "Logo" : "Avatar"}
          </h2>
          <p className="text-base font-thin text-[#d9d9d9] mt-2">
            {isOrganization
              ? "The logo displayed for your organization"
              : "The language used in the user interface"}
          </p>
        </div>
        <button
          className={`relative h-[4.88rem] w-[4.88rem] rounded-full border-[4px] ${
            isOrganization ? "border-[#FFAE00]" : "border-[#0075FF]"
          } bg-[#d9d9d9]`}
        >
          <span
            className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs font-light text-white capitalize ${
              isOrganization ? "bg-[#FFAE00]" : "bg-[#0075FF]"
            } w-[4.5rem] py-1 rounded-2base`}
          >
            {isOrganization ? "Premium+" : "free user"}
          </span>
        </button>
      </div>

      {/* Username / Organization Name */}
      <div className="flex items-center justify-between mt-6">
        <h2 className="text-base font-normal text-fontlight capitalize">
          {isOrganization ? "Organization Name" : "Username"}
        </h2>
        <button className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-card/20 hover:bg-card/50 transition-all">
          <span className="text-base font-normal text-fontlight">
            {displayName}
          </span>
          <Image src="/edit.png" alt="edit" width={20} height={20} />
        </button>
      </div>

      {/* Email / Organization Email */}
      <div className="flex items-center justify-between mt-6">
        <h2 className="text-base font-normal text-fontlight capitalize">
          {isOrganization ? "Organization Email" : "Email"}
        </h2>
        <button className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-card/20">
          <span className="text-base font-normal text-fontlight">
            {displayEmail}
          </span>
        </button>
      </div>

      
      {/* User Role and Access Level */}
      {!isOrganization && (
        <div className="flex flex-col gap-6 mt-6">
          <div className="flex flex-row items-center justify-between">
            <p>Role</p>
            <p className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-card/20">{role}</p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>Access Level</p>
            <p className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-card/20">{accessLevel}</p>
          </div>
        </div>
      )
      }

      {/* AI Data Retention (Hidden for Organization) */}
      {/* {!isOrganization && (
        <div className="flex items-center justify-between mt-6">
          <div>
            <h2 className="text-base font-normal text-fontlight capitalize">
              AI Data Retention
            </h2>
            <p className="text-base font-thin text-[#d9d9d9] mt-2">
              AI Data Retention allows Perplexity to use your searches to improve
              AI models. Enable this setting if you wish to exclude your data from
              this process
            </p>
          </div>
          <button className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-card/20 hover:bg-card/50 transition-all">
            <span className="text-base font-normal text-fontlight capitalize">
              disabled
            </span>
          </button>
        </div>
      )} */}
    </div>
  );
}

export default Personalization;
