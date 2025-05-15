'use client';
import Image from 'next/image';
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Usecard = ({ usecase }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400" />
        ))}
        {halfStar && <FaStarHalfAlt key="half" className="text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-yellow-400" />
        ))}
      </>
    );
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text;
  };

  return (
    <div className='flex gap-3 flex-col'>
      <div className='flex flex-row gap-2'>
        <Image src={'/Ellipse.svg'} alt='ellipse' width={44} height={44} />
        <div className='flex flex-col gap-2'>
          <span className='font-bold'>{usecase.name}</span>
          <div className='h-4 flex flex-row gap-2'>
            {renderStars(usecase.rating)}
          </div>
        </div>
      </div>
      <div>
        <p className='leading-[20.48px] text-base font-normal text-[#C6C6C6]'>
          {truncateText(usecase.description, 8)}
        </p>
      </div>
    </div>
  );
};

export default Usecard;
