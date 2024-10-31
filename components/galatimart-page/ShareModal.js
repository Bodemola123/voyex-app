import React, { useRef, useEffect } from 'react';
import { AiOutlineCopy, AiOutlineInstagram, AiOutlineWhatsApp } from 'react-icons/ai';
import { RxCross2 } from "react-icons/rx";

const ShareModal = ({ isOpen, onClose, position }) => {
  const modalRef = useRef(null);

// Effect for handling click outside ( if I want it only to close with the button only i can erase it)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="absolute z-50 bg-[#010202] p-6 rounded-lg shadow-lg flex flex-col gap-4"
      style={{ top: position?.top, right: position?.right }}
    >
      <div className='flex justify-between'>
        <p>Share ChatGPT</p>
        <button onClick={onClose}>
          <RxCross2 className='text-white' />
        </button>
      </div>
      <div className="flex gap-4">
        <button className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
          <AiOutlineInstagram className="w-6 h-6 text-white" />
        </button>
        <button className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
          <AiOutlineWhatsApp className="w-6 h-6 text-white" />
        </button>
        <button className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
          <AiOutlineCopy className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className='flex flex-col gap-2'>
        <p>Copy Link</p>
        <div className="bg-gray-800 rounded-md p-3 flex items-center justify-between">
          <p className="text-white text-sm">https://app.voyex.xyz/s/chatGPT</p>
          <button>
            <AiOutlineCopy className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
