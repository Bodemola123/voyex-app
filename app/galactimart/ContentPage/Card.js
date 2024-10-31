'use client'
import React, { useState }  from 'react'
import ProductCard from '../../../components/galatimart-page/ProductCard';

const Card = () => {


const [products] = useState([
    { id: 1, title: 'ChatGPT', rating: 9, users: '5M+', buttonText: 'Takeoff to App' },
    { id: 2, title: 'ChatGPT', rating: 9, users: '5M+', buttonText: 'Takeoff to App' },
    { id: 3, title: 'ChatGPT', rating: 9, users: '5M+', buttonText: 'Takeoff to App' },
    { id: 4, title: 'ChatGPT', rating: 9, users: '5M+', buttonText: 'Takeoff to App' },
    { id: 5, title: 'ChatGPT', rating: 9, users: '5M+', buttonText: 'Takeoff to App' },
    { id: 6, title: 'ChatGPT', rating: 9, users: '5M+', buttonText: 'Takeoff to App' },
    { id: 7, title: 'ChatGPT', rating: 9, users: '5M+', buttonText: 'Takeoff to App' },
    { id: 8, title: 'ChatGPT', rating: 9, users: '5M+', buttonText: 'Takeoff to App' },
    { id: 9, title: 'ChatGPT', rating: 9, users: '5M+', buttonText: 'Takeoff to App' },
    { id: 10, title: 'ChatGPT', rating: 9, users: '5M+', buttonText: 'Takeoff to App' },
    { id: 11, title: 'ChatGPT', rating: 9, users: '5M+', buttonText: 'Takeoff to App' },
    { id: 12, title: 'ChatGPT', rating: 9, users: '5M+', buttonText: 'Takeoff to App' },
    { id: 13, title: 'ChatGPT', rating: 9, users: '5M+', buttonText: 'Takeoff to App' },
    { id: 14, title: 'ChatGPT', rating: 9, users: '5M+', buttonText: 'Takeoff to App' },
    { id: 15, title: 'ChatGPT', rating: 9, users: '5M+', buttonText: 'Takeoff to App' },
      ]);
    


  return (
    <div className="grid grid-cols-3 gap-4 w-auto">
        {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default Card