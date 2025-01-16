import Image from 'next/image'
import React from 'react'
import { IoCube } from "react-icons/io5";
import '../../app/globals.css'

const Visible = () => {
  return (
    <nav className='flex flex-col w-full bg-[#131314] items-center h-screen pt-12'>
        <div className='flex px-6 gap-4 flex-row items-center'>
          <Image src={'/Crown.svg'} alt='crown' width={32} height={32}/>
          <p className='font-extrabold text-3xl text-[#f4f4f4]'>Voyex</p>
        </div> 
        <div className='flex flex-row py-5 px-6 gap-2.5 mt-5'>
            <IoCube className='text-[#ffffff] text-[24px]'/>
            <p className='text-[20px] font-bold'>Categories</p>
        </div>
        <div className='flex flex-col gap-[9px] border-b border-[#FFFFFF26] overflow-y-scroll scrollbar-hide scroll-container'>

        <button className='flex gap-2.5 py-5 px-6'>Ads</button>
        <button className='flex gap-2.5 py-5 px-6'>AI</button>
        <button className='flex gap-2.5 py-5 px-6'>Content</button>
        <button className='flex gap-2.5 py-5 px-6'>Education</button>
        <button className='flex gap-2.5 py-5 px-6'>Marketing</button>
        <button className='flex gap-2.5 py-5 px-6'>Product</button>
        <button className='flex gap-2.5 py-5 px-6'>Research</button>
        <button className='flex gap-2.5 py-5 px-6'>Scripts</button>
        <button className='flex gap-2.5 py-5 px-6'>Social Media</button>
        <button className='flex gap-2.5 py-5 px-6'>Video Editor</button>
        <button className='flex gap-2.5 py-5 px-6'>Video Editor</button>

        </div>     
    </nav>
  )
}

export default Visible
