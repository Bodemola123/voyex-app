import ConversationRate from "@/components/workspace-page/ConversationRate";
import TopRegions from "@/components/workspace-page/TopRegions";
import UniqueClicks from "@/components/workspace-page/UniqueClicks";
import React from "react";

function Conversation() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <ConversationRate />
      <div className="flex items-start gap-5 w-full max-h-min">
        <UniqueClicks />
        <TopRegions />
      </div>
    </div>
  );
}

export default Conversation;
