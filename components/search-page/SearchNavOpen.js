"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
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
import ShareChatModal from './Modals/ShareChatModal';
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
setShowChat,
activeChatId,
fetchChats}) => {

  const [activeModal, setActiveModal] = useState(null);
  const [firstModalData, setFirstModalData] = useState({});
  const [secondModalData, setSecondModalData] = useState({});
  const [thirdModalData, setThirdModalData] = useState({});
  const [dropdownChatId, setDropdownChatId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false)
    const [selectedChat, setSelectedChat] = useState(null);  // Track selected chat


  const openModal = (modalName) => setActiveModal(modalName);

  const closeModal = () => {
    setFirstModalData({});
    setSecondModalData({});
    setThirdModalData({});
    setActiveModal(null);
  };

  const dropdownRef = useRef(null);

  const handleDeleteChat = async () => {
    if (!selectedChat) return;

    try {
      const res = await fetch(
        `https://jxj7b9c08d.execute-api.ap-southeast-2.amazonaws.com/default/voyex_chat?chat_id=${selectedChat.chat_id}`,
        { method: 'DELETE' }
      );


    const data = await res.json();
    console.log("Delete response:", data);

      if (!res.ok) throw new Error("Failed to delete chat");

      setChats(prev => prev.filter(chat => chat.chat_id !== selectedChat.chat_id));
      if (selectedChat.chat_id === activeChatId) {
        setShowChat(false);
        handleNewConversation()
        handleResetRecommendationButton()
      }
      toast.success("Chat deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete chat.");
    } finally {
      setShowDeleteModal(false);
      setSelectedChat(null);
    }
  };
  
const handleRenameChat = async (newName) => {
  if (!newName.trim() || !selectedChat) return;

  try {
    const res = await fetch(
      `https://jxj7b9c08d.execute-api.ap-southeast-2.amazonaws.com/default/voyex_chat?chat_id=${selectedChat.chat_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: selectedChat.chat_id,
          chat_title: newName,
          chat: selectedChat.chat || [],
          metadata: { using: "chatbot" }
        })
      }
    );

    const data = await res.json();
    console.log("Rename response:", data);

    if (!res.ok || data.message !== "Chat updated successfully") {
      throw new Error("Rename failed");
    }

    setChats((prev) =>
      prev.map((chat) =>
        chat.chat_id === selectedChat.chat_id
          ? { ...chat, chat_title: newName }
          : chat
      )
    );

    toast.success("Chat renamed successfully!");
  } catch (error) {
    console.error("Rename error:", error);
    toast.error("Failed to rename chat.");
  } finally {
    setShowRenameModal(false);
  }
};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownChatId(null);
      }
    };
  
    if (dropdownChatId) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownChatId]);
  

  const categorizeChatsByDate = (chats) => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
  
    const todayChats = [];
    const pastSevenDaysChats = [];
    const olderChats = [];
  
    chats.forEach(chat => {
      const updatedAt = new Date(chat.updated_at);
      if (updatedAt.toDateString() === today.toDateString()) {
        todayChats.push(chat);
      } else if (updatedAt >= sevenDaysAgo) {
        pastSevenDaysChats.push(chat);
      } else {
        olderChats.push(chat);
      }
    });
  
    const sortByUpdatedAtDesc = (a, b) => new Date(b.updated_at) - new Date(a.updated_at);
  
    return {
      todayChats: todayChats.sort(sortByUpdatedAtDesc),
      pastSevenDaysChats: pastSevenDaysChats.sort(sortByUpdatedAtDesc),
      olderChats: olderChats.sort(sortByUpdatedAtDesc)
    };
  };
  
  const renderChatList = (label, chatsList) => (
    <div className="flex flex-col gap-3 py-1">
      <div className="flex justify-between items-center text-base text-[#f4f4f4]">
        <p className="font-bold">{label}</p>
        <p className="font-medium">{chatsList.length} Total</p>
      </div>
      <div className="flex flex-col gap-3 text-xs font-medium">
        {chatsList.map((chat) => {
          const title = chat.chat_title || 'Untitled';
  
          return (
            <div
              key={chat.chat_id}
              className="relative rounded-xl px-3 py-2 flex justify-between items-center text-sm text-[#565656] hover:bg-[#1D1F20] hover:text-[#f4f4f4] cursor-pointer"
              onClick={() => {
                fetchChatById(chat.chat_id);
                setDropdownChatId(null);
              }}
              id='chatfetched'
            >
              <p className="truncate line-clamp-1 pr-1">{title}</p>
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownChatId(dropdownChatId === chat.chat_id ? null : chat.chat_id);
                  }}
                  id='dropdown_chat_clicked'
                >
                  <BsThreeDots className="text-base" />
                </button>
                {dropdownChatId === chat.chat_id && renderDropdown(chat)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  
  const renderDropdown = (chat) => (
    <div className="absolute right-0 top-full mt-2 bg-[#1c1d1f] z-50 text-white rounded-md p-4 w-max border border-transparent shadow-none flex flex-col gap-2"  ref={dropdownRef} >
            <button className="flex items-center gap-2.5 p-2 hover:bg-[#131314] text-[#f4f4f4] rounded-lg w-full" id="sharechat_clicked"
                    onClick={(e) => {
                e.stopPropagation();
                setSelectedChat(chat);
                setShowShareModal(true);
              }}>
        <IoShareSocial className="text-base" />
        <span className="text-sm">Share Chat</span>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSelectedChat(chat);
          setShowRenameModal(true);
        }}
        className="flex items-center gap-2.5 p-2 hover:bg-[#131314] text-[#f4f4f4] rounded-lg w-full" id="renamechat_clicked"
      >
        <FaPen className="text-base" />
        <span className="text-sm">Rename Chat</span>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSelectedChat(chat);
          setShowDeleteModal(true);
        }}
        className="flex items-center gap-2.5 p-2 hover:bg-[#131314] text-[#FF1E1E] rounded-lg w-full" id="deletechat_clicked"
      >
        <FaRegTrashCan className="text-base" />
        <span className="text-sm">Delete Chat</span>
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
            <button id='new_chat' className='rounded-[66px] mx-auto bg-[#1d1d1f] flex flex-row gap-3 py-3 w-full items-center justify-center'    onClick={() => {
    handleResetRecommendationButton();
    handleNewConversation();
  }}>
              <FaPlus className='text-[10px] text-white/40' />
              <p className='text-xs text-white/60'>New chat</p>
            </button>
            <Link href='/galactimart' className='py-4 flex flex-row gap-2.5 bg-transparent items-center hover:bg-[#1D1F20]' id='galactimart_link'>
              <FiShoppingCart className='text-[18px] text-[#94a3b8]' />
              <p className='font-medium text-base text-[#f4f4f4]'>Galactimart</p>
            </Link>
            <button onClick={() => openModal('first')} className='py-4 flex flex-row gap-2.5 bg-transparent items-center hover:bg-[#1D1F20]' id='custom_instructions'>
              <PiLightbulb className='text-[18px] text-[#94a3b8]' />
              <p className='font-medium text-base text-[#f4f4f4]'>Custom Instructions</p>
            </button>
          </div>
        </div>
        {isLoggedIn ? (
          <div className='overflow-y-scroll scrollbar-hide flex flex-col gap-2 pb-1 h-full'>
          {loading && <p>Loading chats...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {chats.length === 0 && !loading && !error && <p>No chats in history</p>}

          {todayChats.length > 0 && renderChatList("Today", todayChats)}
          {pastSevenDaysChats.length > 0 && renderChatList("Past 7 Days", pastSevenDaysChats)}
          {olderChats.length > 0 && renderChatList("Older Chats", olderChats)}
        </div>
        ) : (
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col justify-center items-start gap-3'>
              <Link href='/auth/user' className='py-4 flex flex-row gap-2.5 bg-transparent items-center group' id='log_in_button_search'>
                <LuLogIn className='text-[18px] text-[#94a3b8] group-hover:text-[#c088fb]' />
                <p className='font-medium text-base text-[#f4f4f4] group-hover:text-[#c088fb]'>Log in</p>
              </Link>
              <Link href="/auth/user" className='py-4 flex flex-row gap-2.5 bg-transparent items-center group' id='sign_up_button_search'>
                <PiUserPlusFill className='text-[18px] text-[#94a3b8] group-hover:text-[#c088fb]' />
                <p className='font-medium text-base text-[#f4f4f4] group-hover:text-[#c088fb]'>Sign up</p>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {showDeleteModal && (
  <DeleteChatModal
    onClose={() => setShowDeleteModal(false)}
    onConfirm={handleDeleteChat}
    currentTitle={selectedChat.chat_title || 'Untitled'}
  />
)}

{showRenameModal && (
  <RenameChatModal
    onClose={() => setShowRenameModal(false)}
    onConfirm={handleRenameChat}
    currentTitle={selectedChat.chat_title || 'Untitled'}
  />
)}

{showShareModal && (
  <ShareChatModal
  onClose={() => setShowShareModal(false)}
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
