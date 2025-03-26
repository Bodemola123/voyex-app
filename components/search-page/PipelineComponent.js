import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { FaRegStar } from 'react-icons/fa';
import { IoMdLink } from 'react-icons/io';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { PiLightning } from 'react-icons/pi';

const PipelineComponent = () => {
  const [openStep, setOpenStep] = useState(null);
  const [openTool, setOpenTool] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800, // Smooth animation duration
      once: false, // Allows animation to re-trigger
      mirror: true, // Runs animation when scrolling back up
    });
  }, []);

  const toggleStep = (step) => {
    setOpenStep(openStep === step ? null : step);
  };

  const toggleTool = (tool) => {
    setOpenTool(openTool === tool ? null : tool);
  };

  return (
    <div className='flex flex-col gap-2.5 w-full h-full text-[#f4f4f4]'>
      <div className='flex gap-2 flex-row justify-end items-center'>
        <div className='py-2 px-4 gap-2.5 flex flex-row rounded-lg bg-[#131314] items-center justify-center'>
          <FaRegStar className='text-base' />
          <p className='text-sm font-normal'>Rating</p>
        </div>
        <div className='py-2 px-4 gap-2.5 flex flex-row rounded-lg bg-[#131314] items-center justify-center'>
          <PiLightning className='text-base' />
          <p className='text-sm font-normal'>Price</p>
        </div>
      </div>

      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className='flex flex-col bg-[#1C1D1F] py-2.5 px-4 gap-4 rounded-2xl'
          data-aos="fade-up" // Animation trigger
        >
          <div className='flex flex-row justify-between items-center cursor-pointer' onClick={() => toggleStep(step)}>
            <p className='text-sm font-bold'>Step {step}</p>
            <MdOutlineKeyboardArrowUp
              className={`text-lg transition-transform ${openStep === step ? 'rotate-180' : ''}`}
            />
          </div>
          <p className='text-sm font-bold'>{step === 1 ? 'Content Generation' : step === 2 ? 'Image Generation' : 'Product Photoshoot'}</p>
          <p className='font-normal text-sm'>
            {step === 1
              ? 'Creating engaging descriptions that boost product visibility and attract customers'
              : step === 2
              ? 'Generating visual content from textual descriptions, using AI to produce images that visually represent ideas or product'
              : 'Captures high-quality images of products, showcasing their features and design to enhance their appeal to consumers'}
          </p>
          <hr></hr>
          {openStep === step && step === 1 && (
            <div className='flex flex-col gap-4 mt-4'>
              <p className='text-base font-bold'>Recommended tools</p>
              {['ChatGPT', 'Gemini'].map((tool) => (
                <div key={tool} className='flex flex-col'>
                  <div className='flex flex-row justify-between items-center cursor-pointer' onClick={() => toggleTool(tool)}>
                    <div className='flex flex-row gap-2 items-center justify-center'>
                      <Image src={`/${tool.toLowerCase()}forchat.svg`} alt={tool} width={24} height={24} />
                      <p className='font-medium text-base'>{tool}</p>
                      <p className={`text-xs font-medium ${tool === 'ChatGPT' ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#C088FB] via-[#9747FF] to-[#9747FF]' : 'text-[#46BA3C]'}`}>Third party payment</p>
                    </div>
                    <MdOutlineKeyboardArrowUp
                      className={`text-lg transition-transform ${openTool === tool ? 'rotate-180' : ''}`}
                    />
                  </div>
                  {openTool === tool && (
                    <div className='flex flex-col mt-4 gap-4'>
                      <div className='grid grid-cols-4 gap-2 overflow-x-auto scrollbar-hide'>
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className='bg-[#d9d9d9] h-[125px] w-full'></div>
                        ))}
                      </div>
                      <ol className='list-decimal space-y-1 pl-4 text-sm'>
                        <li><strong>Access {tool} Platform:</strong> You can access {tool} through various platforms such as websites, apps, or integrated into other services.</li>
                        <li><strong>Start a Conversation:</strong> Once you&apos;re on the platform, you&apos;ll typically see a chat interface where you can type your messages or questions.</li>
                        <li><strong>Type Your Message:</strong> Just like you&apos;re texting a friend, type your message or question into the chat box.</li>
                        <li><strong>Receive Response:</strong> {tool} will generate a response based on what you&apos;ve asked.</li>
                        <li><strong>Continue Conversation:</strong> You can continue the conversation by responding.</li>
                        <li><strong>Engage Responsibly:</strong> Avoid asking for or providing personal, sensitive, or inappropriate information.</li>
                        <li><strong>Enjoy the Interaction:</strong> Explore different topics, learn new things, or simply enjoy chatting with AI.</li>
                      </ol>
                      <hr></hr>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className='bg-[#0A0A0B] py-2.5 px-4 flex flex-col gap-4 rounded-2xl'>
        <p className='text-sm font-bold'>Visit App</p>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row gap-2 items-center justify-center'>
            <Image src={'/chatgptforchat.svg'} alt='ChatGPT' width={24} height={24} />
            <p className='font-medium text-base'>ChatGPT</p>
            <p className='text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#C088FB] via-[#9747FF] to-[#9747FF]'>Third party payment</p>
          </div>
          <IoMdLink className='text-lg hover:text-[#c088fb]' />
        </div>
      </div>
    </div>
  );
};

export default PipelineComponent;
