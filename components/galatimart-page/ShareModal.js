import React, { useRef, useEffect } from 'react';
import { AiOutlineCopy, AiOutlineInstagram, AiOutlineWhatsApp } from 'react-icons/ai';
import { IoCopyOutline } from 'react-icons/io5';
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify';

const ShareModal = ({ isOpen, onClose, position, toolUrl, toolName }) => {
  const modalRef = useRef(null);

  // Close on outside click
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

  const handleCopy = () => {
    if (toolUrl) {
      navigator.clipboard.writeText(toolUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleWhatsAppShare = () => {
    const message = `Check out this awesome tool: ${toolName || 'Tool'} — ${toolUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleInstagramShare = () => {
    const message = `Check out this awesome tool: ${toolName || 'Tool'} — ${toolUrl}`;
    // Instagram does not support direct web sharing like WhatsApp
    toast('Instagram sharing must be done manually.');
    window.open(`https://www.instagram.com/`, '_blank');
  };

  return (
    <div
      ref={modalRef}
      className="absolute z-50 bg-[#010202] p-6 w-[450px] rounded-[25px] shadow-lg flex flex-col gap-4"
      style={{ top: position?.top, right: position?.right }}
    >
      <div className='flex justify-between items-center'>
        <p className='text-2xl font-semibold text-[#ffffff]'>Share {toolName || "Tool"}</p>
        <button onClick={onClose}>
          <RxCross2 className='text-white text-lg' />
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleInstagramShare}
          className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center"
        >
          <AiOutlineInstagram className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={handleWhatsAppShare}
          className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center"
        >
          <AiOutlineWhatsApp className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={handleCopy}
          className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center"
        >
          <AiOutlineCopy className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className='flex flex-col gap-2'>
        <p className='text-base font-normal text-white'>Copy Link</p>
        <div className="bg-[#171920] rounded-[51px] p-4 flex items-center justify-between">
          <p className="text-white text-base font-medium break-all">{toolUrl}</p>
          <button onClick={handleCopy}>
            <IoCopyOutline className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
