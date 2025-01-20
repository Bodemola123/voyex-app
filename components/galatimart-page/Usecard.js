'use client'
import Image from 'next/image'
import React from 'react'
import { FaStar } from 'react-icons/fa';

const Usecard = ({ usecase }) => {

  const renderStars = (rating) => {
    return Array.from({ length: rating }).map((_, index) => (
      <FaStar key={index} className="text-yellow-400" />
    ));
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text;
  };

  return (
    <div className='flex gap-3 flex-col' key={usecase.id} usecase={usecase}>
        <div className='flex flex-row gap-2'>
            <Image src={'/Ellipse.svg'} alt='ellipse' width={44} height={44}/>
            <div className='flex flex-col gap-2'>
                <span className='font-bold'>{usecase.title}</span>
                <div className='h-4 flex flex-row gap-2'>{renderStars(usecase.rating)}</div>
            </div>
        </div>
        <div className=''>
              <p className='leading-[20.48px] text-base font-normal text-[#C6C6C6]'>
                  {truncateText("Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, hic voluptatem nostrum non perferendis ab eveniet, aliquam ea, voluptatum", 8)}
              </p>
        </div>
    </div>
  )
}

export default Usecard
