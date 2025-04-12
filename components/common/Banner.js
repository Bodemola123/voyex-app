import React from 'react';

const Banner = () => {
  const texts = [
    'Voyex Inc recently secured a funding of $100,000',
    'Voyex Inc recently secured a funding of $100,000'
  ];

  const repeatCount = 20;

  return (
    <div className="overflow-hidden bg-gradient-to-r from-[#F4F4F4] via-[#F4F4F4] to-[#C088FB] py-2 z-50 w-full">
      <div className="flex gap-12 whitespace-nowrap animate-marquee">
        {Array.from({ length: repeatCount }).map((_, index) => (
          <p
            key={index}
            className={`text-base font-medium ${
              index % 2 === 0 ? 'text-[#0a0a0b]' : 'text-[#4B2D6B]'
            }`}
          >
            {texts[index % 2]}
          </p>
        ))}
        {/* Clone for seamless looping */}
        {Array.from({ length: repeatCount }).map((_, index) => (
          <p
            key={`clone-${index}`}
            className={`text-base font-medium ${
              index % 2 === 0 ? 'text-[#0a0a0b]' : 'text-[#4B2D6B]'
            }`}
          >
            {texts[index % 2]}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Banner;
