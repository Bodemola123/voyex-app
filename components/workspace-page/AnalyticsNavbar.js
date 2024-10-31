"use client";

import { analyticsNav } from "@/constants/workspace-page";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function AnalyticsNavbar() {
  const pathname = usePathname();
  const handleActiveTab = () => {
    if (pathname.includes("conversation")) {
      return "text-btnlime font-bold";
    } else if (pathname.includes("conversation")) {
      return "text-btnlime font-bold";
    }
  };

  return (
    <div className="flex items-center justify-start gap-7 mt-8 mb-7 px-4 py-2 rounded-2xl text-fontlight bg-gradient-to-r from-[#00a766]/10 to-[#999999]/10 backdrop-blur-[9.3px]">
      {analyticsNav.map((nav, i) => (
        <Link
          href={nav.link}
          key={i}
          className={`flex items-center gap-2 text-base capitalize hover:text-btnlime transition-all ${
            pathname === nav.link
              ? "text-btnlime font-bold"
              : "text-fontlight font-normal"
          }
          `}
        >
          {nav.icon}
          {nav.name}
        </Link>
      ))}
    </div>
  );
}

export default AnalyticsNavbar;
