import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: '',
    category: 'Education'
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkIfImage(form.image,async(exists)=>{
      if(exists){
        setIsLoading(true);
        await createCampaign({...form, target: ethers.utils.parseUnits(form.target,18)});
        setIsLoading(false);
        navigate("/");
      }
      else{
        alert("Please provide valid url image.")
        setForm({ ...form, image:''})
      }
    })
    console.log(form)
  }

  return (
    <div className="bg-[#330000] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] pb-0 sm:min-w-[380px] space-x-3 rounded-[10px]">
        <h1 className="text-center font-thin text-4xl sm:text-5xl text-[#ff80d5]">Start a Campaign</h1>
        <h1 className="text-center font-thin text-5xl text-[#ff80d5] hidden sm:flex">😎 </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            isInput
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Campaign Title *"
            placeholder="Write a title"
            isInput
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField 
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />

        <div className="w-full flex justify-start items-center p-4 bg-[#800055] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
          <h4 className="font-epilogue font-extrathin text-[25px] text-white ml-[20px]">You will get 100% of the raised amount ❤️</h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Target Amount (ETH) *"
            placeholder="0.50"
            isInput
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            isInput
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField 
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            isInput
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />

        <FormField 
            labelName="Category *"
            placeholder="Choose the category for your campaign"
            inputType="text"
            isSelect
            value={form.category}
            handleChange={(e) => handleFormFieldChange('category', e)}
          />

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Create campaign"
              styles="bg-[#ff3399] hover:bg-[#bc2571] rounded-full"
            />
          </div>
      </form>
    </div>
  )
}

export default CreateCampaign
