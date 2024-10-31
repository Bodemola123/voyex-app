'use client'
import Image from 'next/image'
import React from 'react'
import { FaStar } from 'react-icons/fa';

const Usecard = ( {usecase} ) => {

  const renderStars = (rating) => {
    return Array.from({ length: rating }).map((_, index) => (
      <FaStar key={index} className="text-yellow-400" />
    ));
  };
  
  
  return (
    <div className='w-auto flex gap-3 flex-col'>
        <div className='flex flex-row gap-2'>
            <Image src={'/Ellipse.svg'} alt='ellipse' width={44} height={44}/>
            <div className='flex flex-col gap-2'>
                <span className='font-bold'>{usecase.title}</span>
                <div className='h-4 flex flex-row gap-2'>{renderStars(usecase.rating)}</div>
            </div>

        </div>
        <p className='text-[#C6C6C6]'>Lorem ipsum dolor sit, amet </p>
        <p className='text-[#C6C6C6]'>  consectetur adipisicing elit. </p>
        <p className='text-[#C6C6C6] truncate'>  Numquam, hic voluptatem no... </p>
    </div>
  )
}

export default Usecard