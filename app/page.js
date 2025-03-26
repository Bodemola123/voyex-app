import BenFooter from "@/components/common/BenFooter";
import SearchPageContainer from "@/components/search-page/SearchPageContainer";
import Image from "next/image";

export default function SearchPage() {
  return (
    <main className="relative flex flex-col gap-4 items-center justify-center h-full w-full mx-auto">
      <SearchPageContainer />
            {/* Chatbot Button */}
      <button 
        className="fixed bottom-[92px] right-[92px] w-[65px] h-[65px] rounded-full shadow-lg bg-transparent flex items-center justify-center z-50"
      >
        <Image src="/Button-icon.svg" alt="Chatbot" width={65} height={65} />
      </button>
    </main>
  );
}
