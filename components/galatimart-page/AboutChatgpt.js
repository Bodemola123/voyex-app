'use client'
import React from 'react'

const AboutChatgpt = () => {

    const listItems = [
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione tempora obcaecati, sunt adipisci.',
        'Adipisicing elit. Ratione tempora obcaecati, sunt adipisci velit molestiae! ipsum dolor sit amet consectetur',
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione tempora obcaecati, sunt adipisci velit molestiae!',
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione tempora obcaecati, sunt adipisci.',
      ];

  return (
    <div className='text-[#F4F4F4] gap-4 flex flex-col px-4 py-6 bg-[#131314] rounded-3xl'>
    <p className='text-base font-normal'>Information</p>
    <div className='bg-[#6D6D6D] border'></div>
    <div className='flex flex-col gap-6 h-[417.24px]'>
        <div className='flex flex-col gap-2'>
            <p className='text-base font-bold'>Description</p>
            <p className='text-base font-normal'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, hic voluptatem nostrum non perferendis ab eveniet, aliquam ea, voluptatum asperiores illo corrupti voluptatibus molestiae aut quis. Ex magni nesciunt velit, facilis omnis asperiores iure fugiat delectus illo. Corporis iusto reprehenderit repudiandae explicabo! Exercitationem nemo error, blanditiis architectoLorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, hic voluptatem nostrum non perferendis ab eveniet, aliquam ea, voluptatum asperiores illo corrupti voluptatibus molestiae aut quis. Ex magni nesciunt velit, facilis omnis asperiores iure fugiat delectus illo. Corporis iusto reprehenderit repudiandae explicabo! Exercitationem nemo error,</p>
        </div>
        <div className='flex flex-col gap-2'>
        <p className='text-base font-bold'>Description</p>
        <ol type='1'>
        {listItems.map((item, index) => (
      <li key={index} className=" flex items-start">
        <span className="mr-2">•</span> 
        <span className='truncate'>{item}</span>
         </li>
        ))}
    </ol>
        </div>

    </div>
  </div>
  )
}

export default AboutChatgpt