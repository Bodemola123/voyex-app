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
import { toast } from 'react-toastify';

const SearchNavOpen = ({
  handleNewConversation, 
  handleResetRecommendationButton,   
  fetchChatById,
  chats,
  loading,
  isLoggedIn,
  setChats,
  setLoading,
  error, 
setShowChat,}) => {

  const [activeModal, setActiveModal] = useState(null);
  const [firstModalData, setFirstModalData] = useState({});
  const [secondModalData, setSecondModalData] = useState({});
  const [thirdModalData, setThirdModalData] = useState({});
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);  // Track selected chat


  const openModal = (modalName) => setActiveModal(modalName);

  const closeModal = () => {
    setFirstModalData({});
    setSecondModalData({});
    setThirdModalData({});
    setActiveModal(null);
  };

  
  const handleDeleteChat = async () => {
    const chatToDelete = chats[selectedChat];
    if (!chatToDelete) return;
  
    try {
      const res = await fetch(`https://jxj7b9c08d.execute-api.ap-southeast-2.amazonaws.com/default/voyex_chat?chat_id=${chatToDelete.chat_id}`, {
        method: 'DELETE',
      });
  
      if (!res.ok) throw new Error("Failed to delete chat");
  
      // Check if the chat being deleted is the one currently being viewed
      if (chatToDelete.chat_id === chats.chat_id) {
        setShowChat(false);  // Hide the chat if it's the current one
      }

      setChats(prev => prev.filter((_, i) => i !== selectedChat));
  
      setSelectedChat(null);  // Clear selected chat after deletion
      toast.success("Chat deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete chat.");
    } finally {
      setShowDeleteModal(false);
    }
  };
  
  const handleRenameChat = (newName) => {
    if (!newName.trim()) return;
  
    try {
      setChats(prev =>
        prev.map((chat, i) =>
          i === selectedChat
            ? { ...chat, title: newName } // Update the title
            : chat
        )
      );
      toast.success("Chat renamed successfully!");
  
      // Also update the selectedChat state to reflect the changes in the UI
      setSelectedChat(selectedChat); // Force re-render by updating the selectedChat
    } catch (error) {
      console.error(error);
      toast.error("Failed to rename chat.");
    } finally {
      setShowRenameModal(false);
    }
  };
  
  
  const categorizeChatsByDate = (chats) => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const todayChats = [];
    const pastSevenDaysChats = [];
    const olderChats = [];

    chats.forEach((chat) => {
      const updatedAt = new Date(chat.updated_at);
      if (updatedAt.toDateString() === today.toDateString()) {
        todayChats.push(chat);
      } else if (updatedAt >= sevenDaysAgo) {
        pastSevenDaysChats.push(chat);
      } else {
        olderChats.push(chat);
      }
    });

    return { todayChats, pastSevenDaysChats, olderChats };
  };

  const renderDropdown = (chat) => (
    <div className="absolute right-0 top-full mt-2 w-max items-center justify-center bg-[#1c1d1f] flex flex-col gap-2 text-white rounded-md p-4 z-50 border border-transparent shadow-none">
      <button className="flex gap-2.5 p-2 w-full hover:bg-[#131314] text-[#f4f4f4] justify-start items-center rounded-lg">
        <IoShareSocial className='text-base' />
        <p className='text-sm'>Share Chat</p>
      </button>
      <button
        onClick={() => {
          setSelectedChat(chat);
          setShowRenameModal(true);
        }}
        className="flex gap-2.5 p-2 w-full group hover:bg-[#131314] text-[#f4f4f4] justify-start items-center rounded-lg"
      >
        <FaPen className='text-base' />
        <p className='text-sm'>Rename chat</p>
      </button>
      <button className="flex gap-2.5 p-2 w-full text-[#f4f4f4] hover:bg-[#131314] justify-start items-center">
        <LuArchive className='text-base' />
        <p className='text-sm '>Archive chat</p>
      </button>
      <button
        onClick={() => {
          setSelectedChat(chat);
          setShowDeleteModal(true);
        }}
        className="flex flex-row gap-2.5 p-2 w-full hover:bg-[#131314] text-[#FF1E1E] justify-start items-center"
      >
        <FaRegTrashCan className='text-base' />
        <p className='text-sm '>Delete chat</p>
      </button>
    </div>
  );

  const { todayChats, pastSevenDaysChats, olderChats } = categorizeChatsByDate(chats);
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
          <div className='overflow-y-scroll scrollbar-hide flex flex-col gap-2 pb-1 h-full'>
            {loading && <p className='text-center'>Loading chats...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {chats.length === 0 && !loading && !error && <p>No chats in history</p>}

            {todayChats.length > 0 && (
              <div className='flex flex-col py-1 gap-3'>
                <div className='flex flex-row justify-between items-center text-base'>
                  <p className='text-[#f4f4f4] font-bold'>Today</p>
                  <p className='text-[#f4f4f4] font-medium'>{todayChats.length} Total</p>
                </div>
                <div className='flex flex-col text-xs font-medium gap-3'>
                  {todayChats.map((chat, index) => {
                    const firstUserMessage = chat.chat?.find(msg => msg.role === "user");
                    const title = firstUserMessage?.text?.split(" ")[0] || "Untitled";                    
                    return (
                      <div
                        key={chat.chat_id}
                        className='relative rounded-xl px-3 py-2 gap-3 text-sm flex flex-row justify-between text-[#565656] hover:bg-[#1D1F20] hover:text-[#f4f4f4] items-center w-full cursor-pointer'
                        onClick={() => {
                          fetchChatById(chat.chat_id)
                          setSelectedChat(chat);
                          setDropdownIndex(null);
                        }}
                      >
                        <p className='truncate'>{title}</p>
                        <div className='relative'>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDropdownIndex(dropdownIndex === index ? null : index);
                            }}
                          >
                            <BsThreeDots className='text-base' />
                          </button>
                          {dropdownIndex === index && renderDropdown(index)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {pastSevenDaysChats.length > 0 && (
              <div className='flex flex-col py-1 gap-3'>
                <div className='flex flex-row justify-between items-center text-base'>
                  <p className='text-[#f4f4f4] font-bold'>Past 7 Days</p>
                  <p className='text-[#f4f4f4] font-medium'>{pastSevenDaysChats.length} Total</p>
                </div>
                <div className='flex flex-col text-xs font-medium gap-3'>
                  {pastSevenDaysChats.map((chat, index) => {
                    const firstUserMessage = chat.chat?.find(msg => msg.role === "user");
                    const title = firstUserMessage?.text?.split(" ")[0] || "Untitled";                    
                    return (
                      <div
                        key={chat.chat_id}
                        className='relative rounded-xl px-3 py-2 gap-3 text-sm flex flex-row justify-between text-[#565656] hover:bg-[#1D1F20] hover:text-[#f4f4f4] items-center w-full cursor-pointer'
                        onClick={() => {
                          fetchChatById(chat.chat_id)
                          setSelectedChat(chat);
                          setDropdownIndex(null);
                        }}
                      >
                        <p className='truncate'>{title}</p>
                        <div className='relative'>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDropdownIndex(dropdownIndex === index ? null : index);
                            }}
                          >
                            <BsThreeDots className='text-base' />
                          </button>
                          {dropdownIndex === index && renderDropdown(index)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {olderChats.length > 0 && (
              <div className='flex flex-col py-1 gap-3'>
                <div className='flex flex-row justify-between items-center text-base'>
                  <p className='text-[#f4f4f4] font-bold'>Older Chats</p>
                  <p className='text-[#f4f4f4] font-medium'>{olderChats.length} Total</p>
                </div>
                <div className='flex flex-col text-xs font-medium gap-3'>
                  {olderChats.map((chat, index) => {
                    const firstUserMessage = chat.chat?.find(msg => msg.role === "user");
                    const title = firstUserMessage?.text?.split(" ")[0] || "Untitled";                    
                    return (
                      <div
                        key={chat.chat_id}
                        className='relative rounded-xl px-3 py-2 gap-3 text-sm flex flex-row justify-between text-[#565656] hover:bg-[#1D1F20] hover:text-[#f4f4f4] items-center w-full cursor-pointer'
                        onClick={() => {
                          fetchChatById(chat.chat_id)
                          setSelectedChat(chat);
                          setDropdownIndex(null);
                        }}
                      >
                        <p className='truncate'>{title}</p>
                        <div className='relative'>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDropdownIndex(dropdownIndex === index ? null : index);
                            }}
                          >
                            <BsThreeDots className='text-base' />
                          </button>
                          {dropdownIndex === index && renderDropdown(index)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
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

      {showDeleteModal && selectedChat && (
  <DeleteChatModal
  chatName={selectedChat.title || "Untitled"}
    onClose={() => setShowDeleteModal(false)}
    onDelete={handleDeleteChat}
  />
)}
{showDeleteModal && selectedChat && (
  <RenameChatModal
  chatName={selectedChat.title || "Untitled"}
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
