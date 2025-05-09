'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { MdKeyboardArrowLeft } from "react-icons/md";
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { IoShareOutline } from "react-icons/io5";
import { PiAirplaneBold } from 'react-icons/pi';
import ShareModal from '../../../components/galatimart-page/ShareModal';

const Header = () => {
  const [isShareOpen, setShareOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState(null);
  const shareButtonRef = useRef(null);

  const handleShareClick = () => {
    const buttonRect = shareButtonRef.current.getBoundingClientRect();
    setModalPosition({
      top: `20px`,
      right: `20px`,
    });
    setShareOpen(!isShareOpen);
  };

  return (
    <div className="flex flex-col relative">
      <div className="flex flex-row justify-between">
        <div className='flex flex-row gap-4'>
          <Link href={'/galactimart'} passHref>
            <button className='border border-card gap-2.5 w-12 h-8 flex items-center justify-center rounded-lg'>
              <MdKeyboardArrowLeft className='text-white text-[24px]' />
            </button>
          </Link>

          <div className='flex flex-row gap-4'>
            <Image src={'/chatgpt.svg'} alt='chatgpt' width={66} height={66} />
            <div className='flex flex-col gap-2'>
              <p className='font-bold text-4xl'>ChatGPT</p>
              <div className='gap-4 flex flex-row'>
                <div className='gap-2 flex flex-row'>
                  <FaStar className="text-yellow-400" />
                  <p className='text-xs font-normal'>Rating:</p>
                  <span className='text-xs font-medium'>9/10</span>
                </div>
                <div className='flex flex-row gap-2'>
                  <p className='text-xs font-normal'>Users:</p>
                  <p className='text-xs font-medium'>5M+</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-row gap-2.5 items-center'>
          <div className='py-0.5 px-4 flex gap-2'>
            <button
              ref={shareButtonRef}
              className='flex flex-row gap-2.5'
              onClick={handleShareClick}
            >
              <IoShareOutline className='w-6 h-6 text-white' />
              <p className='font-medium'>Share</p>
            </button>
          </div>

          <button className='bg-[#c088fb] py-2 px-4 gap-2.5 rounded-3xl flex items-center flex-row justify-center'>
            <PiAirplaneBold className='text-[#032400]' />
            <p className='text-base font-medium text-[#032400]'>Takeoff to App</p>
          </button>
        </div>
      </div>

      <div className='flex flex-row justify-between mt-4'>
        <div className='flex gap-2'>
          <p>Usage:</p>
          <p className='font-bold'>CHATBOT</p>
        </div>

        <div className='flex gap-2'>
          {['chatbot', 'writing', 'sales', 'models', 'research'].map((tag) => (
            <span
              key={tag}
              className="text-xs capitalize px-2 py-1 rounded-[21px] bg-[#131314]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setShareOpen(false)}
        position={modalPosition}
      />
    </div>
  );
};

export default Header;
