import Reviews from "@/components/workspace-page/Reviews";
import SocialShares from "@/components/workspace-page/SocialShares";
import React from "react";

function UserEngagement() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <Reviews />
      <div className="h-[500px]">
      <SocialShares />
      </div>
      
    </div>
  );
}

export default UserEngagement;
