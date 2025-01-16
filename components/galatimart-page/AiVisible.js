import React, { useState } from 'react'
import Usecard from './Usecard'

const AiVisible = () => {

        const [usecases] = useState([
            { id: 1, title: 'Use Case 1', rating: 5, },
            { id: 2, title: 'Write Codes', rating: 5, },
            { id: 3, title: 'Medical Pres', rating: 2, },
            { id: 4, title: 'Use Case 4', rating: 3, },
        ])
  return (
      
      <div className={`flex gap-6 py-12 px-4 h-screen w-full justify-start items-center`}>
            <div className='flex flex-col gap-4'>
                <p className='font-medium'>Use Cases</p>
                <div className='grid grid-rows-4 gap-5 w-auto'>
                {usecases.map((usecase) => (
        <Usecard key={usecase.id} usecase={usecase} />
      ))}

                </div>

            </div>

        </div>

  )
}

export default AiVisible
