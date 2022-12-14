import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';

import FundCard from './FundCard';
import Loader from './Loader';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }
  const {searchField}= useStateContext();
  const search=()=>{
    if(searchField!==''){
      return searchField;
    }
    else { return null}
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

        {!isLoading && search()&& campaigns.length > 0 && campaigns.map((campaign) => campaign.amountCollected<campaign.target&&campaign.category.toLowerCase().includes(search())&&<FundCard 
          key={campaign.id}
          {...campaign}
          handleClick={() => handleNavigate(campaign)}
        />)}
        {!isLoading && !search()&& campaigns.length > 0 && campaigns.map((campaign) => campaign.amountCollected<campaign.target&&<FundCard 
          key={campaign.id}
          {...campaign}
          handleClick={() => handleNavigate(campaign)}
        />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns