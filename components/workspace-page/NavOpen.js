import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import { IoCube } from 'react-icons/io5'
import { PiLightbulb } from 'react-icons/pi'

const NavOpen = () => {
  return (
    <nav className='flex flex-col w-full bg-[#131314] items-center justify-between h-screen pt-6'>
    <div className='flex flex-col gap-6 justify-center'>
      <div className='flex px-6 gap-4 flex-row items-center'>
        <Image src={'/Crown.svg'} alt='crown' width={32} height={32} />
        <p className='font-extrabold text-3xl text-[#f4f4f4]'>Voyex</p>
      </div>
      <div className='flex flex-col gap-2 border-b border-[#3A3A40] justify-center'>
        <button className='rounded-[66px] mx-auto bg-[#1d1d1f] flex flex-row gap-3 py-3 px-16 items-center justify-center'>
          <FaPlus className='text-[10px] text-white/40' />
          <p className='text-xs text-white/60'>New model</p>
        </button>
        <Link
        href={'/workspace'}
         className='py-4 px-3 flex flex-row gap-2.5 bg-transparent  hover:bg-[#c088fb] items-center'>
          <IoCube className='text-[#ffffff] text-[18px]'/>
          <p className='font-medium text-base text-[#f4f4f4]'>My Models</p>
        </Link>
        <Link href='/galactimart' className='py-4 px-3 flex flex-row gap-2.5 bg-transparent hover:bg-[#c088fb] items-center rounded-lg'>
          <FiShoppingCart className='text-[18px] text-[#f4f4f4] ' />
          <p className='font-medium text-base text-[#f4f4f4]'>Galactimart</p>
        </Link>
        <button className='py-4 px-3 flex flex-row gap-2.5  bg-transparent hover:bg-[#c088fb] items-center'>
          <PiLightbulb className='text-[18px] text-[#f4f4f4]' />
          <p className='font-medium text-base text-[#f4f4f4]'>Billing</p>
        </button>
      </div>
    </div>
    <button className='flex flex-row py-4 px-6 gap-4 items-start justify-start'>
      <Image src={'/IconContainer.svg'} alt='icon' width={40} height={40} />
      <div className='flex flex-col gap-2 items-start'>
      <p className='text-sm text-[#f4f4f4] font-medium '>Upgrade Plan</p>
      <p className='text-xs text-[#475569] font-normal'>Get GPT-8 and more</p>
      </div>
    </button>
  </nav>
  )
}

export default NavOpen