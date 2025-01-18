"use client";
import React, { useState } from "react";
import "./CardsSection.css";
import ProductCard from "./ProductCard1";

const Card2 = () => {
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
      id:5,
      title: "ChatGPT",
      rating: 9,
      users:"5M+",
      buttonText: "Takeoff to APP",
    }
  ]);


  return (
    <div className="flex-row cards-wrapper">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Card2;
