import FlexibleFooter from "@/components/common/FlexibleFooter";
import Personalization from "@/components/settings-page/Personalization";
import Profile from "@/components/settings-page/Profile";
import React from "react";

function PersonalizationPage() {
  return (
    <>
      <Personalization />
      <Profile />
      <FlexibleFooter />
    </>
  );
}

export default PersonalizationPage;
