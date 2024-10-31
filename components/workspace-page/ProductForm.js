"use client";

import Image from "next/image";
import { useState } from "react";
import WorkspaceForm1 from "./Form1";
import Workspaceform2 from "./Form2";
import WorkspaceForm3 from "./Form3";

function ProductForm() {
  const [activeTab, setActiveTab] = useState("");

  const handleActiveTab = () => {
    if (activeTab === "form1") {
      return <WorkspaceForm1 setActiveTab={setActiveTab} />;
    } else if (activeTab === "form2") {
      return <Workspaceform2 setActiveTab={setActiveTab} />;
    } else if (activeTab === "form3") {
      return <WorkspaceForm3 setActiveTab={setActiveTab} />;
    } else return <WorkspaceForm1 setActiveTab={setActiveTab} />;
  };
  return (
    <div className="h-screen overflow-y-scroll no-scrollbar">
      <main className="flex w-full h-full items-center">
        {handleActiveTab()}
        <figure className="w-1/2 h-full relative hidden lg:block lg:bg-transparent z-0">
          <div className="fixed top-0 right-0 h-full w-[60%]">
            <Image
              src="/rocket.png"
              alt="rocket space ship"
              decoding="async"
              width={500}
              height={400}
              className="absolute bottom-0 w-full h-[90%]"
            />
          </div>
        </figure>
      </main>
    </div>
  );
}

export default ProductForm;
