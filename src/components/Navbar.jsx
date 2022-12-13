import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './';
import {  createCampaign, menu, search, thirdweb } from '../assets';
import logo from './logo2.png'
import { navlinks } from '../constants';

const Navbar = () => {
  const navigate = useNavigate();
  const handleProfileClick=()=>{
    setIsActive('profile');
  }
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address ,isActive,setIsActive} = useStateContext();
  // console.log(connect());
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#4d0028] rounded-[100px]">
        <input type="text" placeholder="Search for campaigns" className="flex w-full font-epilogue font-normal text-lg placeholder:text-[#cc0069] text-[#ff66b5] bg-transparent outline-none transition-all ease-in-out delay-100" />
        <div className="w-[72px] h-full rounded-[20px] bg-[#ff3399] hover:bg-[#bc2571] flex justify-center items-center cursor-pointer">
          <img src={search} alt="search" className="w-[15px] h-[15px] object-contain"/>
        </div>
      </div>

      {address&&<div className='text-[#ff80d5]  items-center justify-center bg-[#4d0028] px-3 rounded-full space-x-3 hidden md:flex'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png" alt="" className='h-7 w-7'/>
        <p>{address.split('').slice(0,5).join("")}...{address.split('').slice(38).join("")}</p>
      </div>}
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton 
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect Wallet'}
          styles={address ? 'bg-[#ff3399] hover:bg-[#bc2571] rounded-full' : 'bg-[#cc0000] hover:bg-[#990000] rounded-full'}
          handleClick={() => {
            if(address){ 
              navigate('create-campaign');
              setIsActive('create-campaign')
          }
            else connect()
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer" onClick={handleProfileClick}>
            <img src="https://source.unsplash.com/random/man,woman" alt="user" className="object-cover w-full h-full rounded-full" />
          </div>
        </Link>
      </div>


      {/* Small screen navigation */}


        <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[50px] h-[50px] rounded-[10px]  flex justify-center items-center cursor-pointer">
            <img src={logo} alt="user" className="w-full h-full object-contain" />
          </div>

          <img 
            src={menu}
            alt="menu"
            className="w-[34px] h-[34px] object-contain cursor-pointer"
            onClick={() => setToggleDrawer((prev) => !prev)}
          />

          <div className={`absolute top-[60px] right-0 left-0 bg-[#4d0000] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
            <ul className="mb-4">
              {navlinks.map((link) => (
                <li
                  key={link.name}
                  className={`flex p-4 ${isActive === link.name && 'bg-[#80002a]'}`}
                  onClick={() => {
                    setIsActive(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }}
                >
                  <img 
                    src={link.imgUrl}
                    alt={link.name}
                    className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                  />
                  <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                    {link.name}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex mx-4 space-y-3">
            <CustomButton 
              btnType="button"
              title={address ? 'Create a campaign' : 'Connect Wallet'}
              styles={address ? 'bg-[#ff3399] hover:bg-[#bc2571] rounded-full transition-all ease-in-out delay-100' : 'bg-[#cc0000] hover:bg-[#990000] rounded-full transition-all ease-in delay-150'}
              handleClick={() => {
                if(address) {
                  navigate('/create-campaign')
                setIsActive('campaign')
              }
                else connect();
              }}
            />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar