import React from 'react'
import Header from './Header'
import Body from './Body'

const page = () => {
  return (
    <div className='text-white flex flex-col w-full h-full gap-6'>
        <Header/>
        <Body/>
        
    </div>

  )
}

export default page