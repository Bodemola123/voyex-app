"use client"
import BenFooter from "@/components/common/BenFooter";
import SearchPageContainer from "@/components/search-page/SearchPageContainer";
import Image from "next/image";
import "../app/globals.css"
import Popup from "@/components/search-page/Popup";
import { useState } from "react";
import Welcome from "@/components/user-signing-page/Welcome";

export default function SearchPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <main className="relative flex flex-col gap-4 items-center justify-center h-full w-full mx-auto">
      {/* <SearchPageContainer />
      Chatbot Popup
      <Popup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      Chatbot Button
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-[20px] right-[32px] w-[55px] h-[55px] rounded-full shadow-lg bg-transparent flex items-center justify-center z-50 message-bubble"
      >
        <Image src="/ChatBotIcon.svg" alt="Chatbot" width={55} height={55} />
      </button> */}
      <Welcome/>
    </main>
  );
}
