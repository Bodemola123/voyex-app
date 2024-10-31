import React from "react";
import WorkspacePrimaryPurpose from "./PrimaryPurpose";
import WorkspaceUseCase from "./UseCase";
import WorkspaceSubUseCase from "./SubUseCase";

function Form2({ setActiveTab }) {
  return (
    <section className="w-full lg:w-[70%] h-full z-10">
      <div className="container relative flex justify-center items-center mx-auto w-full h-full">
        <div className="w-full h-full max-w-[700px] flex flex-col justify-center">
          <h1 className="text-5xl font-bold capitalize">poduct use cases</h1>
          <WorkspacePrimaryPurpose />
          <WorkspaceUseCase />
          <WorkspaceSubUseCase />
          <button
            className="text-xl text-white font-medium w-full h-14 rounded-full bg-btnlime mt-5"
            onClick={() => setActiveTab("form3")}
          >
            Proceed to API and integrations
          </button>
        </div>
      </div>
    </section>
  );
}

export default Form2;
