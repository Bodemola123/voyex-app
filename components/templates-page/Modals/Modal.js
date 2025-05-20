// 'use client'
// import Image from 'next/image';
// import React from 'react';
// import { FaStar } from 'react-icons/fa6';
// import { IoShareOutline } from 'react-icons/io5';

// const Modal = ({ product, onClose }) => {
//     return (
//         <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)]  flex items-center justify-center z-50">
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
        <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)] flex items-center justify-center z-50">
            <div className="bg-[#1C1D1F] rounded-3xl p-[33px] max-w-[1002px] gap-[29px] flex flex-col justify-between items-center text-[#f4f4f4]">
                <div className="flex flex-row justify-between items-center w-full">
                        <h2 className="text-3xl font-bold text-[#f4f4f4]">{product.title.toUpperCase()}</h2>
                    <div className='flex flex-row gap-4 items-center justify-center'>
                        <button className='flex flex-row gap-2.5'>
                            <IoShareOutline className='w-6 h-6 text-white' />
                            <p className='font-medium'>Share</p>
                        </button>
                        <button onClick={onClose} className="flex items-center justify-center">
                            <Image src="/close-square.svg" alt="X" width={58} height={58} />
                        </button>
                    </div>
                </div>

                <p className='font-normal text-[#F4F4F4] text-2xl'>Where the <span className='text-[#FBAD41] font-semibold'>cosmic meets the artificial </span>, offering a stellar selection of AI companions tailored to your interstellar adventures</p>
                <p className='font-normal text-base text-[#FFFFFF]'>In the age of rapid content consumption, bulk video generation is revolutionizing how brands, educators, and creators produce high-quality videos at scale. By leveraging AI-powered automation, this approach enables the creation of multiple videos simultaneously—each tailored with unique messaging, branding, or localized content—without the painstaking effort of manual editing.</p>

                <div className="flex gap-4">
                    <div className="bg-[#131314] p-6 rounded-2xl gap-6 justify-start flex flex-col flex-1">
                        <h3 className="text-2xl font-semibold">Use Cases</h3>
                        <ol type='1' className='text-[#f4f4f4] font-normal text-base list-decimal ml-6 space-y-0.5'>
                            <li>Marketing & Advertising &ndash; Generate personalized video ads for different demographics.</li>
                            <li>E-Learning &ndash; Create course modules, training videos, and explainer content effortlessly.</li>
                            <li>E-Commerce &ndash; Automate product video creation based on inventory updates.</li>
                            <li>Social Media &ndash; Batch-create content optimized for different platforms and trends.</li>
                        </ol>
                    </div>
                    <div className="bg-[#131314] p-6 rounded-2xl gap-4 justify-start flex flex-col flex-1">
                        <h3 className="text-2xl font-semibold">OUR TEMPLATE</h3>
                        <div className="flex items-center gap-1 text-yellow-400">
                            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='flex justify-between items-center text-[#f4f4f4] text-base'>
                                <p className='font-normal'>Pricing</p>
                                <p className='font-bold'>$4.00 -$8.00</p>
                            </div>
                            <div className='flex justify-between items-center text-[#f4f4f4] text-base'>
                                <p className='font-normal'>Global Use</p>
                                <p className='font-bold'>Over 500+ Monthly</p>
                            </div>
                            <div className='flex justify-between items-center text-[#f4f4f4] text-base'>
                                <p className='font-normal'>Templates Used</p>
                                <p className='font-bold'>1K+ weeky</p>
                            </div>
                            <div className='flex justify-between items-center text-[#f4f4f4] text-base'>
                                <p className='font-normal'>Tools Variation</p>
                                <p className='font-bold'>100+ tools</p>
                            </div>
                            <div className='flex justify-between items-center text-[#f4f4f4] text-base'>
                                <p className='font-normal'>Ease of Use</p>
                                <p className='font-bold'>VERY EASILY USED</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row justify-between items-center w-full'>
                    <span className='p-4 text-base font-bold underline underline-offset-1'>What are templates?</span>
                <button 
                    onClick={handleRedirect}  // Add onClick handler
                    className="bg-[#c088fb] max-w-[327px] p-4 rounded-[30px] text-[#0a0a0b] font-medium hover:scale-110 hover:bg-purple/70">
                    Continue to Use Template
                </button>
                </div>

            </div>
        </div>
    );
};

export default Modal;



