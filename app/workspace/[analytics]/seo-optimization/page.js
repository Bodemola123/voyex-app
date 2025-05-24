import Keyword from "@/components/workspace-page/Keyword";
import KeywordUsage from "@/components/workspace-page/KeywordUsage";
import SocialSignals from "@/components/workspace-page/SocialSignals";
import React from "react";

function SeoOptimization() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <Keyword />
      <SocialSignals />
      <KeywordUsage />
    </div>
  );
}

export default SeoOptimization;
