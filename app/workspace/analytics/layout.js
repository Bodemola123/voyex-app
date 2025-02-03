import BenFooter from "@/components/common/BenFooter";
import AnalyticsHeader from "@/components/workspace-page/AnalyticsHeader";
import UsageInfoContainer from "@/components/workspace-page/UsageInfoContainer";
import React from "react";

function AnalyticsLayout({ children }) {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <AnalyticsHeader/>
     <UsageInfoContainer />
     {children}
     <BenFooter/>
    </div>
  );
}

export default AnalyticsLayout;
