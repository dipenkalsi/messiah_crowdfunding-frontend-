import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);
  const [isOwner,setIsOwner] = useState(false);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  }

  useEffect(() => {
    if(contract) fetchDonators();
    if(address===state.owner){
      setIsOwner(true);
    }
  }, [contract, address])

  const handleDonate = async () => {
    if(address!==state.owner){
    setIsLoading(true);

    await donate(state.pId, amount); 

    navigate('/')
    setIsLoading(false);
    }
    else{
      console.log("can't donate");
    }
  }

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl"/>
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%'}}>
            </div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#ffb3e6] uppercase">Creator</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src="https://source.unsplash.com/random/man,woman" alt="user" className="w-full rounded-full h-full object-cover"/>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-[#ff00ff] break-all">{state.owner}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#cc00cc]">5 Campaigns</p>
              </div>
            </div>
          </div>

          <div className='flex space-x-14 sm:space-x-24 md:space-x-36'>
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#ffb3e6] uppercase">Title</h4>

              <div>
                <p className="font-epilogue font-normal text-[16px] text-[#cc00cc] leading-[26px] text-justify">{state.title}</p>
              </div>
          </div>
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#ffb3e6] uppercase">Category</h4>

              <div>
                <p className="font-epilogue font-normal text-[16px] text-[#cc00cc] leading-[26px] text-justify">{state.category}</p>
              </div>
          </div>
          </div>
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#ffb3e6] uppercase">Story</h4>

              <div>
                <p className="font-epilogue font-normal text-[16px] text-[#cc00cc] leading-[26px] text-justify">{state.description}</p>
              </div>
          </div>
          

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#ffb3e6] uppercase">Donators</h4>

              <div className="mt-[20px] flex flex-col gap-4">
                {donators.length > 0 ? donators.map((item, index) => (
                  <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                    <p className="font-epilogue font-normal text-[16px] text-[#cc00cc] leading-[26px] break-ll">{index + 1}. {item.donator}</p>
                    <p className="font-epilogue font-normal text-[16px] text-[#cc00cc] leading-[26px] break-ll">{item.donation}</p>
                  </div>
                )) : (
                  <p className="font-epilogue font-normal text-[16px] text-[#800080] leading-[26px] text-justify">No donators yet. Be the first one!</p>
                )}
              </div>
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-[#ffb3e6] uppercase">Donate</h4>   

          <div className="mt-[20px] flex flex-col p-4 bg-[#660000] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#ffb3e6]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input 
                type="number"
                placeholder="ETH 0.01"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#ffb3e6] bg-transparent font-epilogue text-[#ffb3e6] text-[18px] leading-[30px] placeholder:text-[#cc00cc] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] py-4 px-3 bg-[#4d0000] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-lg leading-[22px]  text-[#ffb3e6]">Back it because you believe in it.</h4>
                <p className="mt-[8px] font-epilogue  font-normal leading-[22px] text-sm text-[#cc00cc]">➡️ Support the project for no reward, just because it speaks to you.</p>
                <p className="mt-[8px] font-epilogue  font-normal leading-[22px] text-sm text-[#cc00cc]">➡️ Note that all funds collected will go straight to the campaign holder.</p>
                <p className="mt-[8px] font-epilogue  font-normal leading-[22px] text-sm text-[#cc00cc]">➡️ We assure that on our platform campaign owners are genuine and will use the money collected only for the mentioned cause.</p>
              </div>
              {!address &&<div className='bg-[#330033] text-red-800 pl-3 py-2 rounded-lg'>Connect your wallet to donate to this campaign 💀</div>}
              {!isOwner&&<CustomButton 
                btnType="button"
                title="Fund Campaign 💰"
                styles={`w-full bg-[#cc00cc] hover:bg-[#b300b3] text-xl `}
                handleClick={handleDonate}
              />}
              {isOwner &&
              <div className='bg-[#330033] text-red-800 pl-3 py-2 rounded-lg'>You can't donate to your own campaign 💀</div>
              }
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails