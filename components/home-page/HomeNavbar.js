"use client";
import React from "react";
import Link from "next/link";

function HomeNavbar() {
  return (
    <div className="fixed top-0 flex items-center gap-5 justify-between w-full py-4 px-10 z-10 transition-all">
      <div className="flex items-center z-10">
        <Link href="/" className="flex items-center gap-6 py-4 pr-4">
          <span className="text-xl text-white font-bold">Voyex.</span>
        </Link>
      </div>

      <div className="flex items-center gap-3 z-10">
        <Link
          href="/sign-up"
          className="text-btnlime text-base font-medium py-3 px-4 rounded-xl bg-none capitalize"
        >
          sign up
        </Link>
        <Link
          href="/login"
          className="text-fontlight text-base font-medium py-2 px-9 rounded-xl bg-btnlime capitalize"
        >
          log in
        </Link>
      </div>
    </div>
  );
}
export default HomeNavbar;
