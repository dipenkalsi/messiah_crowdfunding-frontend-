import React, { useState } from 'react';
import {FaEthereum} from 'react-icons/fa'
import {MdCategory} from 'react-icons/md'
import {BsSuitHeart} from 'react-icons/bs'
import {BsFillSuitHeartFill} from 'react-icons/bs'
import { tagType, thirdweb } from '../assets';
import { daysLeft } from '../utils';

const FundCard = ({ owner, title, description, target, deadline, amountCollected, image,category, handleClick  }) => {
  const remainingDays = daysLeft(deadline);
  const [liked,setLiked]=useState(false);
  const handleHeartClick=()=>{
    setLiked(!liked);
  }
  console.log(category)
  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#330033] hover:bg-[#4d004d] transition-all ease-in delay-50 cursor-pointer" onClick={handleClick}>
      <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]"/>

      <div className="flex flex-col p-4">
        <div className='flex justify-between itmes-center'>
        <div className="flex flex-row items-center mb-[18px]">
       < MdCategory className='text-[#e6e600]'/>
          <p className="ml-[7px] mt-[2px] font-epilogue font-medium text-[12px] text-[#e6e600]">{category===''?'Miscellaneous':`${category}`}</p>
        </div>
        {!liked?<BsSuitHeart className='text-[#ff99ff] text-lg' onClick={handleHeartClick}/>:<BsFillSuitHeartFill className='text-[#ff99ff] text-lg' onClick={handleHeartClick}/>}
        </div>
        <div className="block">
          <h3 className="font-epilogue font-bold text-[16px] text-[#ff99ff] text-left leading-[26px] truncate">{title}</h3>
          <p className="mt-[5px] font-epilogue font-extrathin text-[#e600e6] text-left  truncate">{description}</p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <div className='flex items-center justify-center space-x-1'><h4 className="font-epilogue font-extrathin text-2xl leading-[22px] text-[#ff99ff]">{amountCollected}</h4> <FaEthereum className='mb-1 text-[#ff99ff]'/></div>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#e600e6] sm:max-w-[120px] truncate">Raised of {target}</p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-extrathin text-center text-2xl text-[#ff99ff] leading-[22px]">{remainingDays}</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#e600e6] sm:max-w-[120px] truncate">Days Left</p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src="https://source.unsplash.com/random/anime,cartoon" alt="user" className="w-full h-full object-cover rounded-full"/>
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#e600e6] truncate italic">by <span className="text-[#ff99ff]">{owner}</span></p>
        </div>
      </div>
    </div>
  )
}

export default FundCard