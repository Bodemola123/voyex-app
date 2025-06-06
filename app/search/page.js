"use client"
import BenFooter from "@/components/common/BenFooter";
import SearchPageContainer from "@/components/search-page/SearchPageContainer";
import '../../app/globals.css'
import Image from "next/image";
import Popup from "@/components/search-page/Popup";
import { useState } from "react";

export default function SearchPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <main className="relative flex flex-col gap-4 items-center justify-center h-full w-full mx-auto">
      <SearchPageContainer />
      {/* Chatbot Popup */}
      <Popup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Chatbot Button */}
      <button
      id="support_button_clicked"
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-[20px] right-[32px] w-[55px] h-[55px] rounded-full shadow-lg bg-transparent flex items-center justify-center z-50 message-bubble"
      >
        <Image src="/ChatBotIcon.svg" alt="Chatbot" width={55} height={55} />
      </button>
    </main>
  );
}
