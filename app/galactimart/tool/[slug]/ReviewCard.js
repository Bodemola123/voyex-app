'use client'
import Image from 'next/image'
import React from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className='text-[#FCD53F] w-[16.85px] h-[16.85px]' />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className='text-[#FCD53F] w-[16.85px] h-[16.85px]' />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className='text-[#FCD53F] w-[16.85px] h-[16.85px]' />);
    }

    return stars;
  };

  return (
    <div className='w-full max-w-[353px] flex-shrink-0 rounded-2xl flex flex-col gap-4 p-6 bg-[#0a0a0b]'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row gap-[22.46px]'>
          <Image src={'/Ellipse.svg'} alt='image' width={47.74} height={47.74} />
          <div className='flex flex-col gap-[3px]'>
            <p className='font-medium text-base text-[#F4F4F4]'>
              {review.user_name}
            </p>
            <div className='flex flex-row gap-[5.62px]'>
              {renderStars(review.rating)}
            </div>
          </div>
        </div>
        <span className='self-end font-normal text-base text-[#F4F4F4]'>{review.date}</span>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='font-bold text-sm text-[#F4F4F4]'>{review.title}</p>
        <p className='font-normal text-sm line-clamp-4'>{review.review_description}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
