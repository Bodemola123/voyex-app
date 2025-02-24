import Image from 'next/image'
import React from 'react'

const TemplatesCollapsible = () => {
  return (
    <nav className='flex flex-col w-full bg-[#131314] items-center justify-between h-screen pt-6'>
      <div className='flex px-6 gap-4 flex-row items-start justify-start'>
        <Image src={'/Crown.svg'} alt='crown' width={32} height={32} />
        <p className='font-extrabold text-3xl text-[#f4f4f4]'>Voyex</p>
      </div>
    <button className='flex flex-row py-4 px-6 gap-4 items-start justify-start'>
      <Image src={'/IconContainer.svg'} alt='icon' width={40} height={40} />
      <div className='flex flex-col gap-2 items-start'>
        <p className='text-base text-[#f4f4f4] '>Upgrade Plan</p>
        <p className='text-sm text-[#475569]'>Get GPT-8 and more</p>
      </div>
    </button>
  </nav>
  )
}

export default TemplatesCollapsible