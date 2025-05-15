import React from 'react';
import Usecard from './Usecard';
import Image from 'next/image';

const AiNavOpen = ({ useCase }) => {
  return (
    <div className="flex flex-col gap-[54px] py-6 px-4 h-screen w-full justify-start">
      <div className="flex gap-4 flex-row items-center">
        <Image src={'/Crown.svg'} alt='crown' width={32} height={32} />
        <p className="font-extrabold text-3xl text-[#f4f4f4]">Voyex</p>
      </div> 

      <div className="flex flex-col gap-4">
        <p className="font-medium">Use Cases</p>
        <div className="grid grid-rows-4 gap-5 w-auto">
          {useCase.map((usecase, index) => (
            <Usecard
              key={index}
              usecase={{
                id: index,
                name: usecase.usecase_name,
                rating: usecase.usecase_rating,
                description: usecase.description
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiNavOpen;
