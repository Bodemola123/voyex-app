"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { FaPlus, FaPen, FaRegTrashCan } from "react-icons/fa6";
import { IoShareSocial } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import DeleteChatModal from './Modals/DeleteChatModal';
import RenameChatModal from './Modals/RenameChatModal';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { LuLogIn } from 'react-icons/lu';
import { PiUserPlusFill } from 'react-icons/pi';

const HomeNav = ({
  fetchChatById,
  chats,
  loading,
  isLoggedIn,
  setChats,
  setLoading,
  error,
  setShowChat,
   activeChatId, handleNewConversation,handleResetRecommendationButton, fetchChats
}) => {
  const [dropdownChatId, setDropdownChatId] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);

  const handleDeleteChat = async () => {
    if (!selectedChat) return;

    try {
      const res = await fetch(
        `https://jxj7b9c08d.execute-api.ap-southeast-2.amazonaws.com/default/voyex_chat?chat_id=${selectedChat.chat_id}`,
        { method: 'DELETE' }
      );

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
  
      if (data.chat_id) {
        // Update local state
        setChats((prev) =>
          prev.map((chat) =>
            chat.chat_id === selectedChat.chat_id
              ? { ...chat, chat_title: newName } // 👈 Make sure you're using `chat_title`
              : chat
          )
        );
        toast.success("Chat renamed successfully!");
      } else {
        throw new Error("Rename failed");
      }
    } catch (error) {
      console.error("Rename error:", error);
      toast.error("Failed to rename chat.");
    } finally {
      await fetchChats(); // Refresh chat list
      setShowRenameModal(false);
    }
  };
  

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
              id='chat_fetched'
            >
              <p className="truncate line-clamp-1 pr-1">{title}</p>
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownChatId(dropdownChatId === chat.chat_id ? null : chat.chat_id);
                  }} id='dropdown_chat_clicked'
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
  

  const { todayChats, pastSevenDaysChats, olderChats } = categorizeChatsByDate(chats);

  const renderDropdown = (chat) => (
    <div className="absolute right-0 top-full mt-2 bg-[#1c1d1f] z-50 text-white rounded-md p-4 w-max border border-transparent shadow-none flex flex-col gap-2">
      <button className="flex items-center gap-2.5 p-2 hover:bg-[#131314] text-[#f4f4f4] rounded-lg w-full" id="sharechat_clicked">
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
  return (
    <>
      <nav className="flex flex-col w-full h-screen bg-[#131314] px-6 pt-4 gap-6">
        <div className="flex gap-4 items-center">
          <Image src="/Crown.svg" alt="crown" width={32} height={32} />
          <p className="text-3xl font-extrabold text-[#f4f4f4]">Voyex</p>
        </div>

        {isLoggedIn ? (
          <div className='overflow-y-scroll scrollbar-hide flex flex-col gap-2 pb-1 h-full'>
            {loading && <p>Loading chats...</p>}
            {error && <p className="text-red-500">Failed to load chats, Try Again later</p>}
            {chats.length === 0 && !loading && !error && <p>No chats in history</p>}

            {todayChats.length > 0 && renderChatList("Today", todayChats)}
            {pastSevenDaysChats.length > 0 && renderChatList("Past 7 Days", pastSevenDaysChats)}
            {olderChats.length > 0 && renderChatList("Older Chats", olderChats)}
          </div>
        ) : (
          <div className='flex flex-col gap-6 pt-2 border-t border-[#3A3A40]'>
            <div className='flex flex-col justify-center items-start gap-3'>
              <Link href='/auth/user' className='py-4 flex flex-row gap-2.5 items-center group' id='log_in_button'>
                <LuLogIn className='text-[18px] text-[#94a3b8] group-hover:text-[#c088fb]' />
                <p className='font-medium text-base text-[#f4f4f4] group-hover:text-[#c088fb]'>Log in</p>
              </Link>
              <Link href="/auth/user" className='py-4 flex flex-row gap-2.5 items-center group' id='sign_up_button'>
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

    </>
  );
};

export default HomeNav;
