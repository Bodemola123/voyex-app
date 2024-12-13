import Link from "next/link";
import React from "react";

function AuthHeader() {
  return (
    <Link
      href="/"
      className="flex items-center text-xl text-white font-bold py-4 pr-4 z-10"
    >
      Voyex.
    </Link>
  );
}

export default AuthHeader;
