import React,{useState ,useEffect } from 'react'
import {useStateContext} from '../context'
import { DisplayCampaigns } from '../components';
const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();
  
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
    console.log(data);
  }
  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  const amountRecieved = ()=>{
    let sum=0;
    for(let i=0;i<campaigns.length;i++) sum+=campaigns[i].amountCollected;

    return sum;
  }
  return address ?(
    <div className=' '>
      <div className='flex flex-col items-center justify-center bg-[#330033] rounded-3xl mx-auto mb-5 pb-9'>
      <img src="https://source.unsplash.com/random/anime,cartoon" alt="" className='w-32 h-32 rounded-full mx-auto mt-9 mb-4'/>
      <div className='text-pink-300 px-auto text-center text-3xl font-semibold w-full mb-12'>{address.slice(0,10)}...{address.slice(35)}</div>
      <div className='text-yellow-300 px-auto text-center text-xl font w-full mb-4 uppercase'>Wallet : Metamask </div>
      <div className='text-yellow-300 px-auto text-center text-xl font w-full mb-4 uppercase'>Active campaigns : {campaigns.length} </div>
      <div className='text-yellow-300 px-auto text-center text-xl font w-full uppercase'>Total Amount recieved : {amountRecieved()} ETH</div>
      </div>
      <DisplayCampaigns 
      title="My Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
    </div>
  ):(<div className=' '>
    <div className='h-full w-full flex items-center justify-center'>
      <div className='text-[#e600e6] text-6xl font-extrathin text-center mt-28'>You don't have a wallet connected 😔💔</div>
    </div>
</div>)
}

export default Profile

