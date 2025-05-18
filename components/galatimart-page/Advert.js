import Link from 'next/link';
import React from 'react';

const Advert = () => {
  return (
    <div className="w-full h-full border border-[#FFFFFF26] bg-[#131314] flex flex-row justify-between gap-8 rounded-[32px]">
      <div className="flex flex-col gap-5 justify-center items-start px-8 py-6">
        <div className="flex flex-col gap-4 max-w-[658px]">
          <p className="text-[40px] font-bold text-[#F4F4F4] text-left">
            Join as an Organization Today!
          </p>
          <p className="text-left">
            Where the cosmic meets the artificial, offering a stellar selection
            of AI companions tailored to your interstellar adventures
          </p>
        </div>
        <Link
          href="/auth/organization"
          className="bg-[#c088fb] flex justify-center items-center py-4 px-4 rounded-[30px] text-base font-medium text-[#0A0A0B] w-[373px]"
        >
          <p>Register as an Organization</p>
        </Link>
      </div>

      {/* Background Image Div */}
      <div
        className="flex-1 bg-no-repeat bg-center bg-cover rounded-r-[32px]"
        style={{ backgroundImage: "url('/Advert1.svg')" }}
      ></div>
    </div>
  );
};

export default Advert;
