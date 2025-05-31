"use client"
import Link from 'next/link'
import React from 'react'
import { FaRegStar } from 'react-icons/fa'
import { IoShareOutline } from 'react-icons/io5'
import { MdKeyboardArrowLeft } from 'react-icons/md'

const StepsHeader = ({templateData}) => {
  return (
    <div className='flex flex-row justify-between items-center w-full'>
        <div className='flex gap-4 items-center justify-center'>
            <Link href={`/templates`} passHref>
            <button className='w-[48px] h-[32px] border border-card gap-2.5 flex items-center justify-center rounded-lg'>
            <MdKeyboardArrowLeft className='text-white text-[24px]' />
            </button>
            </Link>
            <div className='bg-[#131314] px-4 py-3 rounded-[10px]'>
                <p className='text-base font-medium text-[#f4f4f4]'>{templateData?.name}</p>
            </div>
        </div>
        <div className='flex gap-4 items-center justify-center'>
            <div className='bg-[#131314] px-4 py-3 flex gap-1 text-base text-[#FFFFFF99] justify-center items-center rounded-[10px]'>
                <FaRegStar/>
                <p className='font-medium '>Add Favorite</p>
            </div>
            <div className='bg-[#131314] px-4 py-3 flex gap-1 text-base text-[#FFFFFF99] justify-center items-center rounded-[10px]'>
                <IoShareOutline/>
                <p className='font-medium '>Share Templates</p>
            </div>
        </div>
      
    </div>
  )
}

export default StepsHeader
