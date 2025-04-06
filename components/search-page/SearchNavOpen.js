import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { PiLightbulb } from "react-icons/pi";
import FirstModal from './Modals/FirstModal';
import SecondModal from './Modals/SecondModal';
import ThirdModal from './Modals/ThirdModal';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const SearchNavOpen = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [firstModalData, setFirstModalData] = useState({});
  const [secondModalData, setSecondModalData] = useState({});
  const [thirdModalData, setThirdModalData] = useState({});

  const [expandToday, setExpandToday] = useState(false);
  const [expandYesterday, setExpandYesterday] = useState(false);

  const openModal = (modalName) => setActiveModal(modalName);

  const closeModal = () => {
    setFirstModalData({});
    setSecondModalData({});
    setThirdModalData({});
    setActiveModal(null);
  };

  const todayItems = [
    "How to be a better person?",
    "Hacking FBI server with linux",
    "How to get rich from youtube as an influencer",
    "Help me with web development tasks from client",
    "REACT NEXTJS Tutorial",
    "How to make your AI chatbot smarter",
    "Examples of Python decorators"
  ];

  const yesterdayItems = [
    "Mobile app prototypes library",
    "ROM Types and uses",
    "Fix SSL/TLS Error",
    "Platform template for developers",
    "Mobile development with golang",
    "Next.js Routing Simplified",
    "How to build an API in Golang"
  ];

  return (
    <>
      <nav className='flex flex-col w-full bg-[#131314] justify-between h-screen px-4 pt-6'>
        <div className='flex flex-col gap-6 border-b border-[#3A3A40]'>
          <div className='flex gap-4 flex-row items-center'>
            <Image src={'/Crown.svg'} alt='crown' width={32} height={32} />
            <p className='font-extrabold text-3xl text-[#f4f4f4]'>Voyex</p>
          </div>
          <div className='flex flex-col justify-center items-start'>
            <button className='rounded-[66px] mx-auto bg-[#1d1d1f] flex flex-row gap-3 py-3 w-full items-center justify-center'>
              <FaPlus className='text-[10px] text-white/40' />
              <p className='text-xs text-white/60'>New chat</p>
            </button>
            <Link href='/galactimart' className='py-4 flex flex-row gap-2.5 bg-transparent items-center'>
              <FiShoppingCart className='text-[18px] text-[#94a3b8]' />
              <p className='font-medium text-base text-[#f4f4f4]'>Galactimart</p>
            </Link>
            <button onClick={() => openModal('first')} className='py-4 flex flex-row gap-2.5 bg-transparent items-center'>
              <PiLightbulb className='text-[18px] text-[#94a3b8]' />
              <p className='font-medium text-base text-[#f4f4f4]'>Custom Instructions</p>
            </button>
          </div>
        </div>

        <div className='scrollbar-hide overflow-y-scroll'>
          {/* Today Section */}
          <div className='flex flex-col py-3 gap-2'>
            <div className='flex flex-row justify-between items-center text-base'>
              <p className='text-[#f4f4f4] font-bold'>Today</p>
              <button
                onClick={() => setExpandToday(!expandToday)}
                className='flex flex-row gap-2 justify-center items-center'
              >
                <p className='text-[#f4f4f4] font-medium'>{todayItems.length} Total</p>
                <MdOutlineKeyboardArrowDown
                  className={`text-xl text-[#f4f4f4] transition-transform duration-200 ${expandToday ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
            <ul className='flex flex-col items-start text-xs font-medium'>
              {(expandToday ? todayItems : todayItems.slice(0, 5)).map((item, index) => (
                <li key={index} className="py-3">{item}</li>
              ))}
            </ul>
          </div>

          {/* Yesterday Section */}
          <div className='flex flex-col py-3'>
            <div className='flex flex-row justify-between items-center text-base'>
              <p className='text-[#f4f4f4] font-bold'>Yesterday</p>
              <button
                onClick={() => setExpandYesterday(!expandYesterday)}
                className='flex flex-row gap-2 justify-center items-center'
              >
                <p className='text-[#f4f4f4] font-medium'>{yesterdayItems.length} Total</p>
                <MdOutlineKeyboardArrowDown
                  className={`text-xl text-[#f4f4f4] transition-transform duration-200 ${expandYesterday ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
            <ul className='flex flex-col items-start text-xs font-medium'>
              {(expandYesterday ? yesterdayItems : yesterdayItems.slice(0, 5)).map((item, index) => (
                <li key={index} className="py-3">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Upgrade Button */}
        <button className='flex flex-row py-4 px-6 gap-4 items-start justify-start border-t border-[#3a3a40]'>
          <Image src={'/IconContainer.svg'} alt='icon' width={40} height={40} />
          <div className='flex flex-col gap-2 items-start'>
            <p className='text-sm text-[#f4f4f4] font-medium '>Upgrade Plan</p>
            <p className='text-xs text-[#475569] font-normal'>Get GPT-8 and more</p>
          </div>
        </button>
      </nav>

      {/* Modals */}
      {activeModal === 'first' && (
        <FirstModal
          closeModal={closeModal}
          openModal={openModal}
          modalData={firstModalData}
          setModalData={setFirstModalData}
        />
      )}
      {activeModal === 'second' && (
        <SecondModal
          closeModal={closeModal}
          openModal={openModal}
          modalData={secondModalData}
          setModalData={setSecondModalData}
        />
      )}
      {activeModal === 'third' && (
        <ThirdModal
          closeModal={closeModal}
          openModal={openModal}
        />
      )}
    </>
  );
};

export default SearchNavOpen;
