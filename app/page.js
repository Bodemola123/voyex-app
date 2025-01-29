"use client";

import BenFooter from "@/components/common/BenFooter";
import BenNavbar from "@/components/common/BenNavbar";
import SearchPageContainer from "@/components/search-page/SearchPageContainer";
import '../app/globals.css'

export default function Home() {
  return (
    <div className="flex flex-col gap-10 overflow-hidden overflow-y-auto scrollbar-hide scroll-container">
      <SearchPageContainer/>
    </div>
  );
}
