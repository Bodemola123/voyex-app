'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { MdKeyboardArrowLeft } from "react-icons/md";
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { IoShareOutline } from "react-icons/io5";
import { PiAirplaneBold } from 'react-icons/pi';
import ShareModal from '../../../../components/galatimart-page/ShareModal';

const Header = ({ logo, title, rating, userCount, toolUrl, tags, category }) => {
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
            {logo ? (
              <Image src={logo} alt={title} width={66} height={66} />
            ) : (
              <div className="w-[66px] h-[66px] rounded-full bg-white" />
            )}
            <div className='flex flex-col gap-2'>
              <p className='font-bold text-4xl'>{title}</p>
              <div className='gap-4 flex flex-row'>
                <div className='gap-2 flex flex-row'>
                  <FaStar className="text-yellow-400" />
                  <p className='text-xs font-normal'>Rating:</p>
                  <span className='text-xs font-medium'>{rating}/5</span>
                </div>
                <div className='flex flex-row gap-2'>
                  <p className='text-xs font-normal'>Users:</p>
                  <p className='text-xs font-medium'>{userCount}</p>
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

          {toolUrl && (
            <a href={toolUrl} target="_blank" rel="noopener noreferrer">
              <button className='bg-[#c088fb] py-2 px-4 gap-2.5 rounded-3xl flex items-center flex-row justify-center'>
                <PiAirplaneBold className='text-[#032400]' />
                <p className='text-base font-medium text-[#032400]'>Takeoff to App</p>
              </button>
            </a>
          )}
        </div>
      </div>

      <div className='flex flex-row justify-between mt-4'>
        <div className='flex gap-2'>
          <p>Usage:</p>
          <p className='font-bold uppercase'>{category}</p>
        </div>

        <div className='flex gap-2 flex-wrap'>
          {tags?.slice(0, 5).map((tag, i) => (
            <span
              key={i}
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
        toolUrl={toolUrl}
        toolName={title}
      />
    </div>
  );
};


export default Header;
