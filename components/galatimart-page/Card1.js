"use client";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ProductCard from "./ProductCard";
import Link from "next/link";

const Card1 = () => {
  const [products] = useState([
    {
      id: 1,
      title: "ChatGPT",
      rating: 9,
      users: "5M+",
      buttonText: "Takeoff to App",
    },
    {
      id: 2,
      title: "ChatGPT",
      rating: 9,
      users: "5M+",
      buttonText: "Takeoff to App",
    },
    {
      id: 3,
      title: "ChatGPT",
      rating: 9,
      users: "5M+",
      buttonText: "Takeoff to App",
    },
    {
      id: 4,
      title: "ChatGPT",
      rating: 9,
      users: "5M+",
      buttonText: "Takeoff to App",
    },
    {
      id: 5,
      title: "ChatGPT",
      rating: 9,
      users: "5M+",
      buttonText: "Takeoff to App",
    },
    {
      id: 6,
      title: "ChatGPT",
      rating: 9,
      users: "5M+",
      buttonText: "Takeoff to App",
    },
  ]);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-start justify-between">
          <div className="flex gap-2 flex-col w-[681px] h-20">
            <h1 className="text-2xl font-bold">Content</h1>
            <p>
              Where the cosmic meets the artificial, offering a stellar
              selection of AI companions tailored to your interstellar
              adventures
            </p>
          </div>
          <Link
            href="/galactimart/ContentPage"
            passHref
            className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C088FB] via-[#8E3EFF] to-[#8E3EFF] px-3 py-1 flex items-center gap-2"
          >
            See More <MdOutlineKeyboardArrowRight className="text-[#c088fb]"/>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4 w-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex gap-2 flex-col w-[681px] h-20">
            <h1 className="text-2xl font-bold">Marketing</h1>
            <p>
              Where the cosmic meets the artificial, offering a stellar
              selection of AI companions tailored to your interstellar
              adventures
            </p>
          </div>
          <button className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C088FB] via-[#8E3EFF] to-[#8E3EFF] h-5 flex items-center justify-center gap-2">
            See More <MdOutlineKeyboardArrowRight className="text-[#c088fb]"/>{" "}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 ">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex gap-2 flex-col w-[681px] h-20">
            <h1 className="text-2xl font-bold">GalactiMart</h1>
            <p>
              Where the cosmic meets the artificial, offering a stellar
              selection of AI companions tailored to your interstellar
              adventures
            </p>
          </div>
          <button className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C088FB] via-[#8E3EFF] to-[#8E3EFF] h-5 flex items-center justify-center gap-2">
            See More <MdOutlineKeyboardArrowRight className="text-[#c088fb]" />{" "}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 ">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card1;
