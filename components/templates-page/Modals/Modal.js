// 'use client'
// import Image from 'next/image';
// import React from 'react';
// import { FaStar } from 'react-icons/fa6';
// import { IoShareOutline } from 'react-icons/io5';

// const Modal = ({ product, onClose }) => {
//     return (
//         <div className="fixed inset-0 bg-[#111111]/30 flex items-center justify-center z-50">
//             <div className="bg-[#000000] rounded-3xl p-6 max-w-[902px] gap-[60px] flex flex-col justify-between items-center text-[#f4f4f4]">
//                 <div className="flex flex-row justify-between items-start gap-10">
//                     <div className='flex flex-col gap-2'>
//                     <h2 className="text-4xl font-bold text-[#f4f4f4]">{product.title.toUpperCase()}</h2>
//                     <div className='flex flex-col text-base font-normal text-[#f4f4f4]'><p>Where the cosmic meets the artificial, offering a stellar selection of AI companions tailored to your interstellar adventures</p></div>
//                     </div>
//                     <div className='flex flex-row gap-4 items-center justify-center'>
//             <button
//               className='flex flex-row gap-2.5'
//             >
//               <IoShareOutline className='w-6 h-6 text-white' />
//               <p className='font-medium'>Share</p>
//             </button>
//                       <button onClick={onClose} className="flex items-center justify-center">
//                         <Image src="/close-square.svg" alt="X" width={108} height={108} />
//                       </button>
//                     </div>
//                 </div>
//                 <div className="flex gap-4">
//                     <div className="bg-[#131314] p-6 rounded-2xl gap-6 justify-center flex flex-col flex-1">
//                         <h3 className="text-2xl font-semibold">DESCRIPTION</h3>
//                         <p className="text-base font-normal">Our E-Commerce Template Generator empowers you to create stunning, responsive templates for any e-commerce platform. Whether you’re running an online marketplace, subscription service, digital product site, or another type of e-commerce business, this tool offers unparalleled customization.</p>
//                     </div>
//                     <div className="bg-[#131314] p-6 rounded-2xl gap-6 justify-center flex flex-col flex-1">
//                         <h3 className="text-2xl font-semibold">OUR TEMPLATE</h3>
//                         <div className="flex items-center gap-1 text-yellow-400">
//                             {[...Array(5)].map((_, i) => <FaStar key={i} />)}
//                         </div>
//                         <ul className="text-sm mt-2 space-y-1">
//                             <li>Pricing: <span className="font-bold">$4.00 - $8.00</span></li>
//                             <li>Global Use: <span className="font-bold">Over 500+ Monthly</span></li>
//                             <li>Templates Used: <span className="font-bold">1K+ Weekly</span></li>
//                             <li>Tools Variation: <span className="font-bold">100+ Tools</span></li>
//                             <li>Ease of Use: <span className="font-bold ">VERY EASILY USED</span></li>
//                         </ul>
//                     </div>
//                 </div>
//                 <button className="bg-[#c088fb] max-w-[327px] p-4 rounded-[30px] text-[#0a0a0b] font-medium hover:scale-110 hover:bg-purple/70">Continue to Use Template</button>
//             </div>
//         </div>
//     );
// };

// export default Modal;


'use client'
import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa6';
import { IoShareOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';  // Import useRouter

const Modal = ({ product, onClose }) => {
    const router = useRouter(); // Initialize useRouter

    const handleRedirect = () => {
        router.push(`/templates/${product.id}`); // Redirect to a new page dynamically
    };

    return (
        <div className="fixed inset-0 bg-[#111111]/30 flex items-center justify-center z-50">
            <div className="bg-[#000000] rounded-3xl p-6 max-w-[902px] gap-[60px] flex flex-col justify-between items-center text-[#f4f4f4]">
                <div className="flex flex-row justify-between items-start gap-10">
                    <div className='flex flex-col gap-2'>
                        <h2 className="text-4xl font-bold text-[#f4f4f4]">{product.title.toUpperCase()}</h2>
                        <div className='flex flex-col text-base font-normal text-[#f4f4f4]'>
                            <p>Where the cosmic meets the artificial, offering a stellar selection of AI companions tailored to your interstellar adventures</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-4 items-center justify-center'>
                        <button className='flex flex-row gap-2.5'>
                            <IoShareOutline className='w-6 h-6 text-white' />
                            <p className='font-medium'>Share</p>
                        </button>
                        <button onClick={onClose} className="flex items-center justify-center">
                            <Image src="/close-square.svg" alt="X" width={108} height={108} />
                        </button>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="bg-[#131314] p-6 rounded-2xl gap-6 justify-center flex flex-col flex-1">
                        <h3 className="text-2xl font-semibold">DESCRIPTION</h3>
                        <p className="text-base font-normal">Our E-Commerce Template Generator empowers you to create stunning, responsive templates for any e-commerce platform. Whether you’re running an online marketplace, subscription service, digital product site, or another type of e-commerce business, this tool offers unparalleled customization.</p>
                    </div>
                    <div className="bg-[#131314] p-6 rounded-2xl gap-6 justify-center flex flex-col flex-1">
                        <h3 className="text-2xl font-semibold">OUR TEMPLATE</h3>
                        <div className="flex items-center gap-1 text-yellow-400">
                            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                        </div>
                        <ul className="text-sm mt-2 space-y-1">
                            <li>Pricing: <span className="font-bold">$4.00 - $8.00</span></li>
                            <li>Global Use: <span className="font-bold">Over 500+ Monthly</span></li>
                            <li>Templates Used: <span className="font-bold">1K+ Weekly</span></li>
                            <li>Tools Variation: <span className="font-bold">100+ Tools</span></li>
                            <li>Ease of Use: <span className="font-bold ">VERY EASILY USED</span></li>
                        </ul>
                    </div>
                </div>
                <button 
                    onClick={handleRedirect}  // Add onClick handler
                    className="bg-[#c088fb] max-w-[327px] p-4 rounded-[30px] text-[#0a0a0b] font-medium hover:scale-110 hover:bg-purple/70">
                    Continue to Use Template
                </button>
            </div>
        </div>
    );
};

export default Modal;



