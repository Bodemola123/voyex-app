'use client'
import React from "react";
import Header1 from './Header1'

import Card from "./Card";

const ContentPage = () => {

  return (
    <div className='text-white flex flex-col w-full h-full px-10 gap-10'>
        <Header1/>
        <Card/>
        
    </div>
  )
}

export default ContentPage