'use client'
import React from 'react'

const AboutChatgpt = ({description}) => {
  return (
    <div className='text-[#F4F4F4] gap-4 flex flex-col px-4 py-6 bg-[#131314] rounded-3xl border border-[#D0D5DD1A]'>
    <p className='text-base font-normal'>Information</p>
    <div className='bg-[#6D6D6D] border'></div>
    <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
            <p className='text-base font-bold'>Description</p>
            <p className='text-base font-normal'>{description}</p>
        </div>
    </div>
  </div>
  )
}

export default AboutChatgpt