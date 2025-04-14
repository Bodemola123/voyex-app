import Link from 'next/link';
import React from 'react';

const Banner = () => {

  return (
    <div className="flex items-center justify-center gap-6 py-3.5 z-50 w-full rounded-xl"
    style={{
      background: 'linear-gradient(90deg, #C088FB 2.3%, #FFFFFF 14.04%, #FFFFFF 51.15%, #FFFFFF 86.38%, #C088FB 100%)'
    }}>
    <p className='text-[#0a0a0b] font-medium text-base'>Are you a product owner looking to gain Publicity on your product?</p>
    <Link href="/auth/organization" className='bg-[#C088FB33] flex justify-center items-center text-center text-[#c088fb] font-bold text-base py-3 px-4 rounded-2xl'>
  <p>Sign Up as Organization</p>
    </Link>
    </div>
  );
};

export default Banner;
