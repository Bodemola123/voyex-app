import { FiSearch, FiFilter, FiGrid, FiPower, FiVolume2, FiDownload } from 'react-icons/fi';
import { HiOutlineBolt, HiOutlineSpeakerWave, HiOutlineSquares2X2 } from 'react-icons/hi2';
import { TbFilter } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { GrTag } from "react-icons/gr";


const Header = () => {
  return (
    <div className="flex flex-col gap-y-6 mt-5">
    <div className="flex flex-row justify-between">
    <div className="flex flex-col gap-2 w-[681px] h-20">
    <h1 className="text-4xl font-bold">GalactiMart</h1>
    <p>Where the cosmic meets the artificial, offering a stellar selection of AI companions tailored to your interstellar adventures</p>
    </div>
    <div className='w-72 h-10 flex flex-row gap-4'>
    <div className='relative  w-[198px]'> 
    <FiSearch className="absolute top-2 left-2 w-6 h-6 text-white" />
      <input
        type="text"
        placeholder="Search"
        className="pl-10 pr-4 py-2 bg-transparent rounded-3xl border border-card w-48 text-white placeholder-white"
      />
    </div>
    <div className='flex flex-row items-center gap-4'>
       <HiOutlineSpeakerWave className='h-6 w-6'/>
        <FiDownload className='h-6 w-6'/>
    </div>
</div>
  </div>
  <div className='flex flex-row justify-between'>
    <div className='h-8 w-52 flex flex-row gap-4 mt-4'>
    <button className='w-28 h-8 rounded-3xl border border-card gap-3 text-sm flex justify-center items-center'> <FaRegStar/> Featured</button>
    <button className='h-8 w-20 rounded-3xl border border-card gap-3 text-sm flex justify-center items-center'>  <HiOutlineBolt/> New</button>
    </div>
    <div className='w-72 h-8 flex flex-row gap-2'>
    <button className='w-24 h-8 gap-3 border border-card text-sm rounded-3xl flex justify-center items-center'> <TbFilter/> Filter</button>
    <button className='w-24 h-8 gap-3 border border-card text-sm rounded-3xl flex justify-center items-center'> <GrTag className='transform scale-x-[-1]'/> Price</button>
    <button className='w-24 h-8 gap-3 border border-card text-sm rounded-3xl flex justify-center items-center'> <HiOutlineSquares2X2/> View</button>
    </div>
    </div>
    </div>
  );
};

export default Header;
