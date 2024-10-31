import Link from "next/link";
import React from "react";

function AuthHeader() {
  return (
    <div className="absolute top-0 flex items-center z-10">
      <Link href="/" className="flex items-center gap-6 py-4 pr-4">
        <span className="text-xl text-white font-bold">Voyex.</span>
      </Link>
    </div>
  );
}

export default AuthHeader;
