import React from "react";

function TemplateAside() {
  return (
    <aside className="sticky top-0 max-w-[500px] w-full h-full">
      <div className="flex w-full bg-fontlight h-32 rounded-xl"></div>
      <div className="flex items-center gap-2 w-full mt-2">
        <div className="flex w-1/2 bg-fontlight h-32 rounded-xl"></div>
        <div className="flex w-1/2 bg-fontlight h-32 rounded-xl"></div>
      </div>
      <div className="flex items-center gap-2 w-full mt-2">
        <div className="flex w-1/2 bg-fontlight h-32 rounded-xl"></div>
        <div className="flex w-1/2 bg-fontlight h-32 rounded-xl"></div>
      </div>
    </aside>
  );
}

export default TemplateAside;
