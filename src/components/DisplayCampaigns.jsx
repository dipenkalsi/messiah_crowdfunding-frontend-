import React from 'react';
import { useNavigate } from 'react-router-dom';

import FundCard from './FundCard';
import Loader from './Loader';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }
  
  const overCampaigns = async()=>{
    let sum=0;
    for(const campaign of campaigns){
      if(campaign.amountCollected>=campaign.target){
        sum++;
      }
    }
    return sum;
  }
  return (
    <div>
      <h1 className="font-epilogue font-extrathin text-[18px] text-[#ff99ff] uppercase text-left w-full">{title} ({campaigns.filter(campaign => campaign.amountCollected< campaign.target).length})</h1>

      <div className="flex items-center justify-center  flex-wrap mt-[20px] gap-[26px] w-full">
        {isLoading && (
         <Loader/>
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
              No campaigns To display 💔
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => campaign.amountCollected!==campaign.target&&<FundCard 
          key={campaign.id}
          {...campaign}
          handleClick={() => handleNavigate(campaign)}
        />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns