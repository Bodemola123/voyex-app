'use client'
import Image from 'next/image'
import React from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

const ReviewCard = ( {review} ) => {
  return (
    <div className='w-full max-w-[353px] flex-shrink-0 rounded-2xl flex flex-col gap-4 p-6 bg-[#0a0a0b]'>
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row gap-[22.46px]'>
                <Image src={'/Ellipse.svg'} alt='image' width={47.74} height={47.74}/>
                <div className='flex flex-col gap-[3px]'>
                    <p className='font-medium text-base text-[#F4F4F4]'>
                        {review.name}
                    </p>
                    <div className='flex flex-row gap-[5.62px]'>
                        <FaStar className='text-[#FCD53F] w-[16.85px] h-[16.85px]'/>
                        <FaStar className='text-[#FCD53F] w-[16.85px] h-[16.85px]'/>
                        <FaStar className='text-[#FCD53F] w-[16.85px] h-[16.85px]'/>
                        <FaStar className='text-[#FCD53F] w-[16.85px] h-[16.85px]'/>
                        <FaRegStar className='text-[#FCD53F] w-[16.85px] h-[16.85px]'/>
                    </div>
                </div>
            </div>
            <span className='self-end font-normal text-base text-[#F4F4F4]'>15/10/2024</span>
        </div>
        <div className='flex flex-col gap-2'>
            <p className='font-bold text-sm text-[#F4F4F4]'>{review.description}</p>
            <p className='font-normal text-sm'>Lörem ipsum sorad Madeleine Engström. Du kan vara drabbad. Krofask nystartsjobb det vill säga vinde.   Lörem ipsum sorad Madeleine Engström. Du kan vara drabbad. 
            </p>
        </div>
    </div>
  )
}

export default ReviewCard