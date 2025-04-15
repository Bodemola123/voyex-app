"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { PiLightbulb } from "react-icons/pi";
import FirstModal from './Modals/FirstModal';
import SecondModal from './Modals/SecondModal';
import ThirdModal from './Modals/ThirdModal';
import { MdDelete, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { FaEllipsisH, FaPen } from 'react-icons/fa';
import { CiShare2 } from 'react-icons/ci';
import { LuArchive, LuLogIn } from 'react-icons/lu';
import { PiUserPlusFill } from "react-icons/pi";
import { BsThreeDots } from 'react-icons/bs';
import { IoShareSocial } from 'react-icons/io5';
import RenameChatModal from './Modals/RenameChatModal';
import DeleteChatModal from './Modals/DeleteChatModal';

const SearchNavOpen = ({handleNewConversation, handleResetRecommendationButton }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [firstModalData, setFirstModalData] = useState({});
  const [secondModalData, setSecondModalData] = useState({});
  const [thirdModalData, setThirdModalData] = useState({});
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [activeChat, setActiveChat] = useState({ index: null, isToday: true });


  const [expandToday, setExpandToday] = useState(false);
  const [expandYesterday, setExpandYesterday] = useState(false);

  const openModal = (modalName) => setActiveModal(modalName);

  const closeModal = () => {
    setFirstModalData({});
    setSecondModalData({});
    setThirdModalData({});
    setActiveModal(null);
  };

  const [selectedChat, setSelectedChat] = useState(null);  // Track selected chat
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [todayItems, setTodayItems] = useState([
    "How to be a better person?",
    "Hacking FBI server with linux",
    "How to get rich from youtube as an influencer",
    "Help me with web development tasks from client",
    "REACT NEXTJS Tutorial",
    "How to make your AI chatbot smarter",
    "Examples of Python decorators"
  ]);

  const [yesterdayItems, setYesterdayItems] = useState([
    "Mobile app prototypes library",
    "ROM Types and uses",
    "Fix SSL/TLS Error",
    "Platform template for developers",
    "Mobile development with golang",
    "Next.js Routing Simplified",
    "How to build an API in Golang"
  ]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserType = localStorage.getItem("userType");
      const storedOrgType = localStorage.getItem("orgType");
      setIsLoggedIn(!!storedUserType || !!storedOrgType);
    }
  }, []);

  const handleDeleteChat = () => {
    const { index, isToday } = activeChat;
    if (isToday) {
      setTodayItems(todayItems.filter((_, i) => i !== index));
    } else {
      setYesterdayItems(yesterdayItems.filter((_, i) => i !== index));
    }
    setShowDeleteModal(false);  // Close modal after deletion
  };

  const handleRenameChat = (newName) => {
    const { index, isToday } = activeChat;
    if (index === null || !newName.trim()) return;
    if (isToday) {
      setTodayItems(prev => prev.map((item, i) => i === index ? newName : item));
    } else {
      setYesterdayItems(prev => prev.map((item, i) => i === index ? newName : item));
    }
    setShowRenameModal(false);
  };
    const renderDropdown = (index, isToday) => (
      <div className="absolute right-0 top-full mt-2 w-max items-center justify-center bg-[#1c1d1f] flex flex-col gap-2 text-white rounded-md p-4 z-50 border border-transparent shadow-none outline-0 focus:ring-0 focus:outline-0">
        <button className="flex gap-2.5 p-2 w-full hover:text-[#c088fb] text-[#f4f4f4] justify-start items-center  rounded-lg">
          <IoShareSocial className='text-base '/>
          <p className='text-sm'>Share Chat</p>
        </button>
        <button
          onClick={() => {
            setActiveChat({ index, isToday });
            setShowRenameModal(true);
          }}
          className="flex gap-2.5 p-2 w-full group hover:text-[#c088fb] text-[#f4f4f4] justify-start items-center rounded-lg"
        >
          <FaPen className='text-base '/>
          <p className='text-sm'>Rename chat</p>
  
        </button>
        <button className="flex gap-2.5 p-2 w-full text-[#f4f4f4] hover:text-[#c088fb] justify-start items-center">
          <LuArchive className='text-base '/>
         <p className='text-sm '> Archive chat</p>
        </button>
        <button
          onClick={() => {
            setActiveChat({ index, isToday });
            setShowDeleteModal(true);
          }}
          className="flex flex-row gap-2.5 p-2 w-full hover:text-red-900 text-[#FF1E1E] justify-start items-center"
        >
          <FaRegTrashCan className='text-base '/>
         <p className='text-sm '> Delete chat</p>
        </button>
      </div>
    );

  return (
    <>
      <nav className='flex flex-col w-full gap-2 bg-[#131314]  h-screen px-4 pt-6'>
        <div className='flex flex-col gap-6 border-b border-[#3A3A40]'>
          <div className='flex gap-4 flex-row items-center'>
            <Image src={'/Crown.svg'} alt='crown' width={32} height={32} />
            <p className='font-extrabold text-3xl text-[#f4f4f4]'>Voyex</p>
          </div>
          <div className='flex flex-col justify-center items-start'>
            <button className='rounded-[66px] mx-auto bg-[#1d1d1f] flex flex-row gap-3 py-3 w-full items-center justify-center'    onClick={() => {
    handleResetRecommendationButton();
    handleNewConversation();
  }}>
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
        {isLoggedIn ? (
          <div className='overflow-y-scroll scrollbar-hide flex flex-col gap-2 pb-1'>
            {/* Today Section */}
            <div className='flex flex-col py-1 gap-1 border-b border-[#3A3A40]'>
              <div className='flex flex-row justify-between items-center text-base'>
                <p className='text-[#f4f4f4] font-bold'>Today</p>
                <button onClick={() => setExpandToday(!expandToday)} className='flex flex-row gap-2 justify-center items-center'>
                  <p className='text-[#f4f4f4] font-medium'>{todayItems.length} Total</p>
                  <MdOutlineKeyboardArrowDown className={`text-xl text-[#f4f4f4] transition-transform duration-200 ${expandToday ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <div className='flex flex-col text-xs font-medium gap-3'>
                {(expandToday ? todayItems : todayItems.slice(0, 5)).map((item, index) => (
                  <div
                    key={index}
                    className='relative rounded-xl px-2 py-2 gap-3 text-sm flex flex-row justify-between text-[#565656] hover:bg-[#1D1F20] hover:text-[#f4f4f4] items-center w-full cursor-pointer'
                    onClick={() => {
                      setSelectedChat(index);
                      setDropdownIndex(null);
                    }}
                  >
                    <p className='truncate'>{item}</p>
                    <div className='relative'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDropdownIndex(dropdownIndex === index ? null : index);
                        }}
                      >
                        <BsThreeDots className='text-base' />
                      </button>
                      {dropdownIndex === index && renderDropdown(index, true)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Yesterday Section */}
            <div className='flex flex-col py-1 gap-1'>
              <div className='flex flex-row justify-between items-center text-base'>
                <p className='text-[#f4f4f4] font-bold'>Yesterday</p>
                <button onClick={() => setExpandYesterday(!expandYesterday)} className='flex flex-row gap-2 justify-center items-center'>
                  <p className='text-[#f4f4f4] font-medium'>{yesterdayItems.length} Total</p>
                  <MdOutlineKeyboardArrowDown className={`text-xl text-[#f4f4f4] transition-transform duration-200 ${expandYesterday ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <div className='flex flex-col text-xs font-medium gap-3'>
                {(expandYesterday ? yesterdayItems : yesterdayItems.slice(0, 5)).map((item, index) => {
                  const adjustedIndex = index + 100;
                  return (
                    <div
                      key={adjustedIndex}
                      className='relative rounded-xl px-2 py-2 gap-3 text-sm flex flex-row justify-between text-[#565656] hover:bg-[#1D1F20] hover:text-[#f4f4f4] items-center w-full cursor-pointer'
                      onClick={() => {
                        setSelectedChat(adjustedIndex);
                        setDropdownIndex(null);
                      }}
                    >
                      <p className='truncate'>{item}</p>
                      <div className='relative'>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDropdownIndex(dropdownIndex === adjustedIndex ? null : adjustedIndex);
                          }}
                        >
                          <BsThreeDots className='text-base' />
                        </button>
                        {dropdownIndex === adjustedIndex && renderDropdown(index, false)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col justify-center items-start gap-3'>
              <Link href='/auth/user' className='py-4 flex flex-row gap-2.5 bg-transparent items-center group'>
                <LuLogIn className='text-[18px] text-[#94a3b8] group-hover:text-[#c088fb]' />
                <p className='font-medium text-base text-[#f4f4f4] group-hover:text-[#c088fb]'>Log in</p>
              </Link>
              <Link href="/auth/user" className='py-4 flex flex-row gap-2.5 bg-transparent items-center group'>
                <PiUserPlusFill className='text-[18px] text-[#94a3b8] group-hover:text-[#c088fb]' />
                <p className='font-medium text-base text-[#f4f4f4] group-hover:text-[#c088fb]'>Sign up</p>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Delete Chat Modal */}
      {showDeleteModal && selectedChat !== null && (
        <DeleteChatModal
          chatName={activeChat.isToday ? todayItems[activeChat.index] : yesterdayItems[activeChat.index]}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDeleteChat}
        />
      )}
      {/* Rename Chat Modal */}
      {showRenameModal && selectedChat !== null && (
        <RenameChatModal
          chatName={activeChat.isToday ? todayItems[activeChat.index] : yesterdayItems[activeChat.index]}
          onClose={() => setShowRenameModal(false)}
          onRename={handleRenameChat}
        />
      )}

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
