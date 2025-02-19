"use client"
import { useEffect } from "react";
import BenFooter from "@/components/common/BenFooter";
import SearchPageContainer from "@/components/search-page/SearchPageContainer";
import '../../app/globals.css';
import { checkAccessToken } from "@/utils/authUtils";
import { toast } from "react-toastify";

export default function SearchPage() {
  useEffect(() => {
    const verifyToken = async () => {
      const token = await checkAccessToken(); 
      if (!token) {
        console.log("No valid token, redirecting to login...");
        toast("No valid token, redirecting to Login page")
        window.location.href = "/auth/user"; // Redirect if no valid token
      }
    };

    verifyToken();
  }, []); // Runs only once when the page loads

  return (
    <main className="relative flex flex-col gap-4 items-center justify-center h-full w-full mx-auto">
      <SearchPageContainer />
    </main>
  );
}
