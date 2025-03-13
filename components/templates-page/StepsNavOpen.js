import Image from 'next/image'
import React from 'react'
import { IoCube } from 'react-icons/io5'

const StepsNavOpen = () => {
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
         {/* Upgrade Plan Section (This section is not in the Figma) */}
      <button className="flex flex-row py-4 px-6 gap-4 mt-auto mb-6 items-start">
        <Image src={"/IconContainer.svg"} alt="icon" width={40} height={40} />
        <div className="flex flex-col gap-1 items-start">
          <p className="text-base text-[#f4f4f4]">Upgrade Plan</p>
          <p className="text-sm text-[#475569] whitespace-nowrap">Get GPT-8 and more</p>
        </div>
      </button>    
    </nav>
  )
}

export default StepsNavOpen