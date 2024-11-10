'use client'
import React, { useEffect, useRef, useState } from 'react'
import { CiPlay1 } from "react-icons/ci";
import Usecard from '../../../components/galatimart-page/Usecard';
import Tabs from '../../../components/galatimart-page/Tabs';
import Card2 from './Card2';
import './CardsSection.css';

const Body = () => {

    const stickyRef = useRef(null);
    const boundaryRef = useRef(null);
    const [isSticky, setIsSticky] = useState(true);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsSticky(false);
            } else {
              setIsSticky(true);
            }
          });
        },
        { threshold: 0 }
      );
  
      if (boundaryRef.current) {
        observer.observe(boundaryRef.current);
      }
  
      return () => observer.disconnect();
    }, []);

    const [usecases] = useState([
        { id: 1, title: 'Use Case 1', rating: 5, },
        { id: 2, title: 'Write Codes', rating: 5, },
        { id: 3, title: 'Medical Pres', rating: 2, },
        { id: 4, title: 'Use Case 4', rating: 3, },
    ])

  return (
    <div className='grid grid-cols-4 gap-8'>
        <div className='w-auto col-span-3 mt-6 flex gap-9 flex-col'>
        <div className='border rounded-[18px] border-card h-[380px] bg-cover bg-center bg-no-repeat flex justify-center items-center' style={{ backgroundImage: "url('/Logged-in.svg')" }}>
                <button className=' p-[23.86px] gap-[23.86px] border rounded-3xl flex  items-center justify-center bg-custom-gradient backdrop-blur-custom'>
                    <CiPlay1 className='text-white w-10 h-10'/>
                </button>
        </div>
        <Tabs/>
        <div className='flex flex-col gap-4'>
            <span  ref={boundaryRef} className='text-[#F4F4F4] text-2xl font-bold'>Other Apps like CHATGPT</span>
            <div  className='scroll-container'>
                <Card2/>
            </div>
        </div>
        </div>

        <div ref={stickyRef}  className={`flex gap-6 p-4 ${isSticky ? 'right-container' : 'not-sticky'}`}>
            <div className='flex flex-col gap-4'>
                <p className='font-medium'>Use Cases</p>
                <div className='grid grid-rows-4 gap-5 w-auto'>
                {usecases.map((usecase) => (
        <Usecard key={usecase.id} usecase={usecase} />
      ))}

                </div>

            </div>

        </div>
    </div>
  )
}

export default Body