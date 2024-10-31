'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

// StarRating Component (Step 1)
const StarRating = ({ onNext }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
        <div className='flex flex-col p-6 gap-[22.46px] rounded-3xl'>
        <div className="flex flex-row justify-between items-center">
      <h1 className="text-[22.46px] leading[33.7px] font-bold">Leave Review</h1>
      <div className="flex flex-row gap-[15.16px] text-[#FCD53F]">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="cursor-pointer"
            onClick={() => handleRating(rating === star ? star - 0.5 : star)}
          >
            {rating >= star ? (
              <FaStar className='w-[45.47px] h-[45.47px]' />
            ) : rating >= star - 0.5 ? (
              <FaStarHalfAlt className='w-[45.47px] h-[45.47px]' />
            ) : (
              <FaRegStar className='w-[45.47px] h-[45.47px]' />
            )}
          </span>
        ))}
      </div>
    </div>
    <div className='mt-5 flex flex-row-reverse gap-2.5'>
    <button
          className="bg-[#46BA3C] text-[#032400] w-[170px] flex items-center justify-center rounded-3xl px-4 py-2.5 "
          onClick={() => onNext(rating)}
        >
          Next
    </button>
    </div>
    </div>

  );
};

// ReviewForm Component (Step 2)
const ReviewForm = ({ rating, onPrevious, onNext }) => {
  const renderStars = (value) => {
    return (
      <div className="flex gap-[10.68px] text-[#FCD53F]">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {value >= star ? (
              <FaStar className='w-[32.03px] h-[32.03px]' />
            ) : value >= star - 0.5 ? (
              <FaStarHalfAlt className='w-[32.03px] h-[32.03px]' />
            ) : (
              <FaRegStar className='w-[32.03px] h-[32.03px]'/>
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col p-6 rounded-3xl gap-[22.46px]">
      <h1 className="text-[22.46px] leading[33.7px] font-bold">Leave Review</h1>
      <div className='grid grid-cols-3 gap-[22px]'>
        <div className='flex flex-col col-span-2 gap-[22px]'>
            <div className='flex flex-col gap-2'>
                <h1 className='font-medium text-base text-[#FFFFFF] leading-[22px]'>Review Title</h1>
                <input type='text' placeholder='abc@example.com' className='flex gap-2.5 p-4 rounded-[51px] bg-[#171920] text-[#FFFFFF] placeholder-[#FFFFFF] '/>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='font-medium text-base text-[#FFFFFF] leading-[22px]'>Review Description</h1>
                <textarea 
                type="text" 
                placeholder="abc@example.com" 
                className="p-4 resize-none rounded-3xl bg-[#171920] text-[#FFFFFF] placeholder-[#FFFFFF] h-[137px] leading-none text-start"></textarea>
            </div>
        </div>
        <div className='flex flex-col items-center'>
        <p className="text-[128.11px] text-[#F4F4F4] leading-[160.14px] font-bold">{rating}</p>
        {renderStars(rating)}
        </div>
      </div>
      <div className="flex gap-[11px] flex-row-reverse ">
      <button
          className="bg-[#46BA3C] text-[#032400] w-[170px] flex items-center justify-center rounded-3xl px-4 py-2.5 "
          onClick={onNext}
        >
          Next
        </button>

        <button
          className="w-[163px] py-1 px-4 gap-2 flex items-center font-medium text-base text-[#F4F4F4]"
          onClick={onPrevious}
        >
          Cancel
        </button>

      </div>
    </div>
  );
};

// FinalPage Component (Step 3)
const FinalPage = ({ onPrevious }) => {

    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
      setRating(value);
    };

    return (
        <div className="rounded-3xl p-6 gap-[35px] flex flex-col">
        <div className='flex flex-col gap-[11.23px]'>
            <h1 className='font-bold text-2xl text-[#F4F4F4]'>Rate Use Cases</h1>
            <p className='text-base font-normal text-[#c6c6c6]'>Use stars to rate how efficient Product use cases are</p>
        </div>
        <div className='grid gap-[34.63px] grid-cols-2'>
            <div className='flex flex-col gap-[33px]'>
                <div className='flex flex-row gap-2.5'>
                    <Image src={'/Ellipse.svg'} alt='ellipse' width={57.77} height={57.77}/>
                    <div className='flex flex-row gap-[41.5px] items-center'>
                        <p className='font-bold text-[21.01px] text-[#F4F4F4]'>Research</p>
                        <div className="flex flex-row gap-[10.5px] text-[#FCD53F]">
                         {[1, 2, 3, 4, 5].map((star) => (
                        <span
                         key={star}
                        className="cursor-pointer"
                        onClick={() => handleRating(rating === star ? star - 0.5 : star)}>
                {rating >= star ? (
                  <FaStar className='w-[32.03px] h-[32.03px]' />
                ) : rating >= star - 0.5 ? (
                  <FaStarHalfAlt className='w-[32.03px] h-[32.03px]' />
                ) : (
                  <FaRegStar className='w-[32.03px] h-[32.03px]' />
                )}
              </span>
            ))}
          </div>
                    </div>
    
                </div>
                <div className='flex flex-row gap-2.5'>
                    <Image src={'/Ellipse.svg'} alt='ellipse' width={57.77} height={57.77}/>
                    <div className='flex flex-row gap-[41.5px] items-center'>
                        <p className='font-bold text-[21.01px] text-[#F4F4F4]'>Write Codes</p>
                        <div className="flex flex-row gap-[10.5px] text-[#FCD53F]">
                         {[1, 2, 3, 4, 5].map((star) => (
                        <span
                         key={star}
                        className="cursor-pointer"
                        onClick={() => handleRating(rating === star ? star - 0.5 : star)}>
                {rating >= star ? (
                  <FaStar className='w-[32.03px] h-[32.03px]' />
                ) : rating >= star - 0.5 ? (
                  <FaStarHalfAlt className='w-[32.03px] h-[32.03px]' />
                ) : (
                  <FaRegStar className='w-[32.03px] h-[32.03px]' />
                )}
              </span>
            ))}
          </div>
                    </div>
    
                </div>
                <div className='flex flex-row gap-2.5'>
                    <Image src={'/Ellipse.svg'} alt='ellipse' width={57.77} height={57.77}/>
                    <div className='flex flex-row gap-[41.5px] items-center'>
                        <p className='font-bold text-[21.01px] text-[#F4F4F4]'>Content Writing</p>
                        <div className="flex flex-row gap-[10.5px] text-[#FCD53F]">
                         {[1, 2, 3, 4, 5].map((star) => (
                        <span
                         key={star}
                        className="cursor-pointer"
                        onClick={() => handleRating(rating === star ? star - 0.5 : star)}>
                {rating >= star ? (
                  <FaStar className='w-[32.03px] h-[32.03px]' />
                ) : rating >= star - 0.5 ? (
                  <FaStarHalfAlt className='w-[32.03px] h-[32.03px]' />
                ) : (
                  <FaRegStar className='w-[32.03px] h-[32.03px]' />
                )}
              </span>
            ))}
          </div>
                    </div>
    
                </div>
            </div>
            <div className='flex flex-col gap-[33px]'>
                <div className='flex flex-row gap-2.5'>
                    <Image src={'/Ellipse.svg'} alt='ellipse' width={57.77} height={57.77}/>
                    <div className='flex flex-row gap-[41.5px] items-center'>
                        <p className='font-bold text-[21.01px] text-[#F4F4F4]'>Use Case 1</p>
                        <div className="flex flex-row gap-[10.5px] text-[#FCD53F]">
                         {[1, 2, 3, 4, 5].map((star) => (
                        <span
                         key={star}
                        className="cursor-pointer"
                        onClick={() => handleRating(rating === star ? star - 0.5 : star)}>
                {rating >= star ? (
                  <FaStar className='w-[32.03px] h-[32.03px]' />
                ) : rating >= star - 0.5 ? (
                  <FaStarHalfAlt className='w-[32.03px] h-[32.03px]' />
                ) : (
                  <FaRegStar className='w-[32.03px] h-[32.03px]' />
                )}
              </span>
            ))}
          </div>
                    </div>
    
                </div>
                <div className='flex flex-row gap-2.5'>
                    <Image src={'/Ellipse.svg'} alt='ellipse' width={57.77} height={57.77}/>
                    <div className='flex flex-row gap-[41.5px] items-center'>
                        <p className='font-bold text-[21.01px] text-[#F4F4F4]'>Use Case 1</p>
                        <div className="flex flex-row gap-[10.5px] text-[#FCD53F]">
                         {[1, 2, 3, 4, 5].map((star) => (
                        <span
                         key={star}
                        className="cursor-pointer"
                        onClick={() => handleRating(rating === star ? star - 0.5 : star)}>
                {rating >= star ? (
                  <FaStar className='w-[32.03px] h-[32.03px]' />
                ) : rating >= star - 0.5 ? (
                  <FaStarHalfAlt className='w-[32.03px] h-[32.03px]' />
                ) : (
                  <FaRegStar className='w-[32.03px] h-[32.03px]' />
                )}
              </span>
            ))}
          </div>
                    </div>
    
                </div>
                <div className='flex flex-row gap-2.5'>
                    <Image src={'/Ellipse.svg'} alt='ellipse' width={57.77} height={57.77}/>
                    <div className='flex flex-row gap-[41.5px] items-center'>
                        <p className='font-bold text-[21.01px] text-[#F4F4F4]'>Use Case 1</p>
                        <div className="flex flex-row gap-[10.5px] text-[#FCD53F]">
                         {[1, 2, 3, 4, 5].map((star) => (
                        <span
                         key={star}
                        className="cursor-pointer"
                        onClick={() => handleRating(rating === star ? star - 0.5 : star)}>
                {rating >= star ? (
                  <FaStar className='w-[32.03px] h-[32.03px]' />
                ) : rating >= star - 0.5 ? (
                  <FaStarHalfAlt className='w-[32.03px] h-[32.03px]' />
                ) : (
                  <FaRegStar className='w-[32.03px] h-[32.03px]' />
                )}
              </span>
            ))}
          </div>
            </div>
    
            </div>
            </div>
        </div>
        <div className="flex gap-[11px] flex-row-reverse ">
      <button
          className="bg-[#46BA3C] text-[#032400] w-[170px] flex items-center justify-center rounded-3xl px-4 py-2.5 "
        >
          Submit
        </button>

        <button
          className="w-[163px] py-1 px-4 gap-2 flex items-center font-medium text-base text-[#F4F4F4]"
          onClick={onPrevious}
        >
          Cancel
        </button>

      </div>
      </div>
    )

}


// Main ReviewSection Component (Holds the Steps Together)
const ReviewSection = () => {
  const [step, setStep] = useState(1); // Tracks which step we're on
  const [rating, setRating] = useState(0); // Stores the user's selected rating

  const handleNext = (value) => {
    if (step === 1) setRating(value);
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="bg-custom-gradient backdrop-blur-custom rounded-3xl">
      {step === 1 && <StarRating onNext={handleNext} />}
      {step === 2 && (
        <ReviewForm
          rating={rating}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
      {step === 3 && <FinalPage onPrevious={handlePrevious} />}
    </div>
  );
};

export default ReviewSection;
