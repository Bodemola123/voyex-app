"use client"

import BenNavbar from "@/components/common/BenNavbar";
import TemplateAside from "@/components/templates-page/TemplateAside";
import TemplatesCollapsible from "@/components/templates-page/TemplatesCollapsible";
import TemplatesNav from "@/components/templates-page/TemplatesNav";
import React, { useEffect, useState } from "react";

export default function TemplateLayout({ children }) {


  return (
      <div className="flex items-center w-full h-full overflow-y-scroll scrollbar-hide">
        {children}
      </div>
  );
}
