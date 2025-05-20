"use client"
import React, { useEffect, useState } from 'react'
import { Separator } from '../ui/separator'
import Image from 'next/image'
import TeamMemberTable from './TeamMember'

const Profile = () => {
  // State to hold the organization name and email
  const [orgName, setOrgName] = useState(null);
  const [orgEmail, setOrgEmail] = useState(null);

  // Retrieve orgName and orgEmail from localStorage
  useEffect(() => {
    const storedOrgName = localStorage.getItem('orgName');
    const storedOrgEmail = localStorage.getItem('orgEmail');

    // Set the state with the values or placeholders
    setOrgName(storedOrgName || 'Organization Name');
    setOrgEmail(storedOrgEmail || 'organization@example.com');
  }, []);

  return (
    <div className='flex flex-col gap-4 items-center justify-center w-full h-full'>
      <div className="w-full rounded-[25px] py-7 px-11 bg-secondary">
        <h1 className="text-fontlight text-base font-normal capitalize">
          Organization and plans 
        </h1>
        <Separator className="my-5 bg-[#6D6D6D]" />
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-normal text-fontlight">
              Plan 
            </h2>
            {/* <p className="text-base font-thin text-[#d9d9d9] mt-2">
              The language used in the user interface
            </p> */}
          </div>
          <button
            className='relative h-[4.88rem] w-[4.88rem] rounded-full border-[4px] border-[#FFAE00] bg-[#d9d9d9]'
          >
            <span
              className='absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs font-light text-white capitalize bg-[#FFAE00] w-[4.5rem] py-1 rounded-2base'
            >
              Premium+
            </span>
          </button>
        </div>
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-base font-normal text-fontlight capitalize">
            Organization Name
          </h2>
          <button className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-card/20 hover:bg-card/50 transition-all">
            <span className="text-base font-normal text-fontlight">
              {orgName}
            </span>
            <Image src="/edit.png" alt="edit" width={20} height={20} />
          </button>
        </div>
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-base font-normal text-fontlight capitalize">
            Organization Email
          </h2>
          <button className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-card/20">
            <span className="text-base font-normal text-fontlight">
              {orgEmail}
            </span>
          </button>
        </div>
      </div>
      <TeamMemberTable/>
    </div>
  )
}

export default Profile;
