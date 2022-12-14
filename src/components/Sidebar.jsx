import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StateContextProvider, useStateContext } from '../context';
import { useDisconnect } from "@thirdweb-dev/react";
import { sun } from '../assets';
import logo from './logo2.png'
import { navlinks } from '../constants';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick ,imgStyles}) => (
  <div className={`w-[48px] h-[48px] rounded-full transition-all ease-in delay-100 ${!(isActive && isActive === name) &&`hover:bg-[#9f214b]`} ${isActive && isActive === name && 'bg-[#80002a]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className={` ${imgStyles}`} />
    ) : (
      <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
    )}
  </div>
)

const Sidebar = () => {
  const {isActive,setIsActive,theme,setTheme} =useStateContext();
  const handleThemeChange=()=>{
    if(theme==="dark"){
      setTheme("light");
    }
    else{
      setTheme("dark")
    }
    console.log(theme)
  }
  const disconnect = useDisconnect();
  const navigate = useNavigate();
  // const [isActive, setIsActive] = useState('dashboard');

  return (
    <div className={theme}>
    <div className="flex justify-between items-center flex-col sticky top-5 h-[90vh]">
      <Link to="/">
        <Icon styles="w-[70px] h-[56px] " imgUrl={logo} imgStyles="w-full px-1" />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#4d0000] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon 
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if(!link.disabled) {
                  setIsActive(link.name);
                  if(link.name==="logout"){
                    disconnect();
                  }
                  else{
                  navigate(link.link);
                  }
                }
              }}
            />
          ))}
        </div>

        <Icon styles="bg-[#4d0000]" imgUrl={sun} handleClick={handleThemeChange}/>
      </div>
    </div>
    </div>
  )
}

export default Sidebar
