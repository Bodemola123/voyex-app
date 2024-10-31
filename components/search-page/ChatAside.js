import React from "react";

function ChatAside() {
  return (
    <div className="w-[45%] mt-5 h-[420px] p-4 bg-gradient-to-tr from-[#00a766]/10 to-[#999999]/10 rounded-xl">
      <div className="flex flex-col gap-2">
        <span className="block w-full rounded-lg h-20 bg-white/50"></span>
        <div className="flex items-center gap-2">
          <span className="block w-1/2 rounded-lg h-20 bg-white/50"></span>
          <span className="block w-1/2 rounded-lg h-20 bg-white/50"></span>
        </div>
        <span className="block w-full rounded-lg h-20 bg-white/50"></span>
      </div>
    </div>
  );
}

export default ChatAside;
