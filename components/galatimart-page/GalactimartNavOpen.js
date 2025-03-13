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
        <div className='flex flex-col px-2 gap-[9px] border-b border-[#FFFFFF26] overflow-y-scroll scrollbar-hide scroll-container'>

        <button className='flex gap-2.5 py-5 px-6 hover:bg-[#c088fb] hover:text-[#0a0a0b]'>Ads</button>
        <button className='flex gap-2.5 py-5 px-6 hover:bg-[#c088fb] hover:text-[#0a0a0b]'>AI</button>
        <button className='flex gap-2.5 py-5 px-6 hover:bg-[#c088fb] hover:text-[#0a0a0b]'>Content</button>
        <button className='flex gap-2.5 py-5 px-6 hover:bg-[#c088fb] hover:text-[#0a0a0b]'>Education</button>
        <button className='flex gap-2.5 py-5 px-6 hover:bg-[#c088fb] hover:text-[#0a0a0b]'>Marketing</button>
        <button className='flex gap-2.5 py-5 px-6 hover:bg-[#c088fb] hover:text-[#0a0a0b]'>Product</button>
        <button className='flex gap-2.5 py-5 px-6 hover:bg-[#c088fb] hover:text-[#0a0a0b]'>Research</button>
        <button className='flex gap-2.5 py-5 px-6 hover:bg-[#c088fb] hover:text-[#0a0a0b]'>Scripts</button>
        <button className='flex gap-2.5 py-5 px-6 hover:bg-[#c088fb] hover:text-[#0a0a0b]'>Social Media</button>
        <button className='flex gap-2.5 py-5 px-6 hover:bg-[#c088fb] hover:text-[#0a0a0b]'>Video Editor</button>
        <button className='flex gap-2.5 py-5 px-6 hover:bg-[#c088fb] hover:text-[#0a0a0b]'>Video Editor</button>

        </div>     
    </nav>
  )
}

export default GalactimartNavOpen
