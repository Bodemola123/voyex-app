import React, { useState } from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import ProductCard from './ProductCard'
import Modal from './Modals/Modal'

const Card = ({selectedProduct, setSelectedProduct}) => {
        const [products] = useState([
      {
        id: 1,
        title: "Marketing Ads",
        buttonText: "See Template",
      },
      {
        id: 2,
        title: "Bulk Video Creation",
        buttonText: "See Template",
      },
      {
        id: 3,
        title: "Social Media",
        buttonText: "See Template",
      },
    ]);    
  return (
    <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex gap-2">
            <h1 className="text-2xl font-bold">Marketing</h1>
          </div>
          <button className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C088FB] via-[#8E3EFF] to-[#8E3EFF] h-5 flex items-center justify-center gap-2">
            See More <MdOutlineKeyboardArrowRight className="text-[#c088fb]"/>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
                ))}
            </div>
            {selectedProduct && <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </div>
  )
}

export default Card
