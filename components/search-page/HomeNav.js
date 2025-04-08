import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { PiLightbulb, PiUserPlusFill } from "react-icons/pi";
import FirstModal from './Modals/FirstModal';
import SecondModal from './Modals/SecondModal';
import ThirdModal from './Modals/ThirdModal';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { LuLogIn } from 'react-icons/lu';

const HomeNav = () => {

  return (
    <>
      <nav className='flex flex-col w-full bg-[#131314] justify-between h-screen px-6 pt-6'>
        <div className='flex flex-col gap-6 border-b border-[#3A3A40]'>
          <div className='flex gap-4 flex-row items-center'>
            <Image src={'/Crown.svg'} alt='crown' width={32} height={32} />
            <p className='font-extrabold text-3xl text-[#f4f4f4]'>Voyex</p>
          </div>
          <div className='flex flex-col justify-center items-start gap-3'>
            <button className='rounded-[66px] mx-auto bg-[#1d1d1f] flex flex-row gap-3 py-3 w-full items-center justify-center'>
              <FaPlus className='text-[10px] text-white/40' />
              <p className='text-xs text-white/60'>New chat</p>
            </button>
            <Link href='/auth' className='py-4 flex flex-row gap-2.5 bg-transparent items-center'>
              <LuLogIn className='text-[18px] text-[#94a3b8]' />
              <p className='font-medium text-base text-[#f4f4f4]'>Log in</p>
            </Link>
            <Link href="/auth/user" className='py-4 flex flex-row gap-2.5 bg-transparent items-center'>
              <PiUserPlusFill className='text-[18px] text-[#94a3b8]' />
              <p className='font-medium text-base text-[#f4f4f4]'>Sign up</p>
            </Link>
          </div>
        </div>



        {/* Footer Upgrade Button */}
        <button className='flex flex-row py-4 gap-4 items-start justify-start'>
          <Image src={'/IconContainer.svg'} alt='icon' width={40} height={40} />
          <div className='flex flex-col gap-2 items-start'>
            <p className='text-sm text-[#f4f4f4] font-medium '>Upgrade Plan</p>
            <p className='text-xs text-[#475569] font-normal'>Get GPT-8 and more</p>
          </div>
        </button>
      </nav>

    </>
  );
};

export default HomeNav;
