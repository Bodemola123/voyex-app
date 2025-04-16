import Image from 'next/image'
import React from 'react'
import { IoCube } from "react-icons/io5";
import '../../app/globals.css'

const GalactimartNavOpen = () => {
  return (
    <nav className='flex flex-col w-full bg-[#131314] h-screen pt-6'>
        <div className='flex px-6 gap-4 flex-row items-center'>
          <Image src={'/Crown.svg'} alt='crown' width={32} height={32}/>
          <p className='font-extrabold text-3xl text-[#f4f4f4]'>Voyex</p>
        </div> 
        <div className='flex flex-row py-5 px-6 gap-2.5 mt-5'>
            <IoCube className='text-[#ffffff] text-[24px]'/>
            <p className='text-[20px] font-bold'>Categories</p>
        </div>
        <div className='flex flex-col px-2 gap-2 overflow-y-scroll scrollbar-hide scroll-container'>

        <button className='flex gap-2.5 py-3 px-6 hover:bg-[#1D1F20] '>Ads</button>
        <button className='flex gap-2.5 py-3 px-6 hover:bg-[#1D1F20] '>AI</button>
        <button className='flex gap-2.5 py-3 px-6 hover:bg-[#1D1F20] '>Content</button>
        <button className='flex gap-2.5 py-3 px-6 hover:bg-[#1D1F20] '>Education</button>
        <button className='flex gap-2.5 py-3 px-6 hover:bg-[#1D1F20] '>Marketing</button>
        <button className='flex gap-2.5 py-3 px-6 hover:bg-[#1D1F20] '>Product</button>
        <button className='flex gap-2.5 py-3 px-6 hover:bg-[#1D1F20] '>Research</button>
        <button className='flex gap-2.5 py-3 px-6 hover:bg-[#1D1F20] '>Scripts</button>
        <button className='flex gap-2.5 py-3 px-6 hover:bg-[#1D1F20] '>Social Media</button>
        <button className='flex gap-2.5 py-3 px-6 hover:bg-[#1D1F20] '>Video Editor</button>
        <button className='flex gap-2.5 py-3 px-6 hover:bg-[#1D1F20] '>Video Editor</button>

        </div>     
    </nav>
  )
}

export default GalactimartNavOpen
