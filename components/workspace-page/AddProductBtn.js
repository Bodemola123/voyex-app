"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function AddProductBtn() {
  const router = useRouter();
  return (
    <button
      className="flex flex-col items-center justify-center bg-gradient-to-r from-[#00a766]/10 to-[#999999]/10 rounded-3xl bg-clip-padding border-2 border-white/50 border-dashed backdrop-blur-[6.8px] p-6"
      onClick={() => router.push("/workspace/upload-product")}
    >
      <Image src="/add.png" alt="add" width={150} height={150} />
      <p className="text-base text-fontlight font-medium capitalize">
        upload product
      </p>
    </button>
  );
}

export default AddProductBtn;
