import React from "react";
import WorkspaceDatePicker from "./DatePicker";
import WorkspaceVersionNumber from "./VersionNumber";

function Form1({ setActiveTab }) {
  return (
    <section className="w-full lg:w-[70%] h-full z-10">
      <div className="container relative flex justify-center items-center mx-auto w-full h-full">
        <div className="w-full h-full max-w-[700px] flex flex-col justify-center">
          <h1 className="text-5xl font-bold  capitalize">poduct details</h1>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium mt-5 uppercase">
              product name
            </label>
            <input
              // type="email"
              placeholder="abc@example.com"
              className="h-14 rounded-full px-4 bg-input outline-none mt-2"
            />
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <label className="text-sm font-medium mt-1 uppercase">
              company/developer
            </label>
            <input
              // type="email"
              placeholder="abc example.com"
              className="h-14 rounded-full px-4 bg-input outline-none mt-2"
            />
          </div>
          <div className="flex items-center justify-between gap-3 mt-4 w-full">
            <WorkspaceDatePicker />
            <WorkspaceVersionNumber />
          </div>
          <button
            className="text-xl text-white font-medium w-full h-14 rounded-full bg-btnlime mt-5"
            onClick={() => setActiveTab("form2")}
          >
            Proceed to use cases
          </button>
        </div>
      </div>
    </section>
  );
}

export default Form1;
