import UsageInfoContainer from "@/components/workspace-page/UsageInfoContainer";
import React from "react";

function AnalyticsLayout({ children }) {
  return (
    <>
      <UsageInfoContainer />
      {children}
    </>
  );
}

export default AnalyticsLayout;
