import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import { IoCube } from 'react-icons/io5'
import { PiLightbulb } from 'react-icons/pi'

const NavOpen = () => {
  return (
    <nav className='flex flex-col w-full bg-[#131314] items-center justify-start h-screen pt-6 px-4'>
    <div className='flex flex-col gap-6 justify-center w-full'>
      <div className='flex gap-4 px-2 flex-row items-center'>
        <Image src={'/Crown.svg'} alt='crown' width={32} height={32} />
        <p className='font-extrabold text-3xl text-[#f4f4f4]'>Voyex</p>
      </div>
      <div className='flex flex-col gap-2 justify-center w-full border-b border-[#FFFFFF26]'>
        {/* <div className='px-2'>
       <button id='workspace_nav_new_model' className='rounded-[66px] bg-[#1d1d1f]  flex flex-row gap-3 h-[51px] w-[236px] items-center justify-center'>
        <FaPlus className='text-[10px] text-white/40' />
        <p className='text-xs text-white/60'>New Model</p>
          </button>
        </div> */}

        <Link
        href={'/workspace'}
         className='py-3 px-6 flex flex-row gap-2.5 bg-transparent  hover:bg-[#1D1F20] items-center rounded-lg'>
          <IoCube className='text-[#ffffff] text-[21px]'/>
          <p className='font-medium text-[18px] text-[#f4f4f4]'>My Models</p>
        </Link>
        <Link href='/galactimart' className='py-3 px-6 flex flex-row gap-2.5 bg-transparent hover:bg-[#1D1F20] items-center rounded-lg'>
          <FiShoppingCart className='text-[21px] text-[#f4f4f4] ' />
          <p className='font-medium text-[18px] text-[#f4f4f4]'>Galactimart</p>
        </Link>
        <button className='py-3 px-6 flex flex-row gap-2.5  bg-transparent hover:bg-[#1D1F20] items-center rounded-lg'>
          <PiLightbulb className='text-[21px] text-[#f4f4f4]' />
          <p className='font-medium text-[18px] text-[#f4f4f4]'>Billing</p>
        </button>
      </div>
    </div>
    {/* <button className='flex flex-row py-4 px-6 gap-4 items-start justify-start'>
      <Image src={'/IconContainer.svg'} alt='icon' width={40} height={40} />
      <div className='flex flex-col gap-2 items-start'>
      <p className='text-sm text-[#f4f4f4] font-medium '>Upgrade Plan</p>
      <p className='text-xs text-[#475569] font-normal'>Get GPT-8 and more</p>
      </div>
    </button> */}
  </nav>
  )
}

export default NavOpen