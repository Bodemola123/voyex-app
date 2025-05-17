import Image from 'next/image';
import React from 'react'
import { IoCopyOutline } from 'react-icons/io5';

const ShareChatModal = ({onClose}) => {
  return (
    <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)] flex items-center justify-center z-50">
      <div className="bg-[#1C1D1F] border border-[#D0D5DD1A] flex flex-col gap-4 text-white rounded-[25px] p-6 w-[619px] relative">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Share Chat</h2>
          <button onClick={onClose}>
            <Image src={'/close-square.svg'} alt="Close" width={58} height={58} />
          </button>
        </div>
        <p>Your name and any messages you add after sharing stay private.</p>
              <div className='flex flex-col gap-2'>
                <p className='text-base font-normal text-white'>Copy Link</p>
                <div className="bg-[#171920] rounded-[51px] p-4 flex items-center justify-between">
                  <p className="text-white text-base font-medium break-all pr-2 line-clamp-1">https;//app.voyex.xyz/s/chat/nasiunsdicnoiajomJNJUIO4NFNCDZ</p>
                  <button>
                    <IoCopyOutline className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

      </div>
    </div>
  )
}

export default ShareChatModal
