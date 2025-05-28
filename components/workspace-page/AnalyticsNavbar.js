"use client";

import { getAnalyticsNav } from "@/constants/workspace-page";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

function AnalyticsNavbar() {
  const pathname = usePathname();
  const params = useParams(); // 🔥 works with /workspace/[analytics]/...

  const analyticsId = params.analytics;
  const navItems = getAnalyticsNav(analyticsId);
  const handleActiveTab = () => {
    if (pathname.includes("conversation")) {
      return "text-[#c088fb] font-bold";
    } else if (pathname.includes("conversation")) {
      return "text-[#c088fb] font-bold";
    }
  };

  return (
    <div className="flex items-center justify-start gap-7 mt-8 mb-7 px-4 py-2 w-fit rounded-2xl text-fontlight bg-[#131314]">
      {navItems.map((nav, i) => (
        <Link
          href={nav.link}
          key={i}
          className={`flex items-center gap-2 text-base capitalize hover:text-[#c088fb] transition-all ${
            pathname === nav.link
              ? "text-[#c088fb] font-bold"
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
