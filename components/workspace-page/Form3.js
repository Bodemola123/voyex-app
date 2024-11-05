"use client";

import { IoAdd } from "react-icons/io5";
import { useRouter } from "next/navigation";

function Form3() {
  const router = useRouter();
  return (
    <section className="w-full lg:w-[70%] h-full z-10">
      <div className="container relative flex justify-center items-center mx-auto w-full h-full">
        <div className="w-full h-full max-w-[700px] flex flex-col justify-center">
          <h1 className="text-5xl font-bold">API and Integration</h1>
          <div className="flex flex-col gap-1 mt-5">
            <label className="text-base font-medium">
              Supported Integration with other tools
            </label>
            <input
              placeholder="abc@example.com"
              className="h-14 rounded-full px-4 bg-input outline-none mt-2"
            />
          </div>
          <div className="flex flex-col gap-1 mt-6">
            <label className="text-base font-medium">Available APIs</label>
            <input
              placeholder="abc example.com"
              className="h-14 rounded-full px-4 bg-input outline-none mt-2"
            />
            <input
              placeholder="abc example.com"
              className="h-14 rounded-full px-4 bg-input outline-none mt-2"
            />
          </div>
          <div className="flex items-center justify-center mt-5">
            <button className="flex items-center justify-start gap-2 text-btnlime text-xl font-medium">
              <span>Add more API</span>
              <IoAdd />
            </button>
          </div>
          <button className="text-xl text-white font-medium w-full h-14 rounded-full bg-btnlime mt-5">
            Proceed to Performance Metrics
          </button>
        </div>
      </div>
    </section>
  );
}

export default Form3;
