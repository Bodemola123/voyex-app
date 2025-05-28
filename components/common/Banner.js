import Link from 'next/link';
import React from 'react';

const Banner = () => {

  return (
    <div
    id='banner'
    className="flex items-center justify-center gap-6 py-2 z-50 w-full rounded-xl bg-[#ffffff]">
    <p className='text-[#0a0a0b] font-medium text-base'>Are you a product owner looking to gain Publicity on your product?</p>
    <Link href="/auth/organization" id='banner_button' className='bg-[#C088FB33] flex justify-center items-center text-center text-[#c088fb] font-bold text-base py-3 px-4 rounded-2xl'>
  <p>Sign Up as Organization</p>
    </Link>
    </div>
  );
};

export default Banner;
