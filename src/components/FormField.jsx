import React from 'react'
import './select-styles.css'

const FormField = ({ labelName, placeholder, inputType, isTextArea, value, handleChange ,isInput,isSelect }) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#ffb3e6] mb-[10px]">{labelName}</span>
      )}
      {isTextArea && (
        <textarea 
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#ffb3e6] bg-transparent font-epilogue text-[#ffb3e6] text-[14px] placeholder:text-[#e60099] rounded-[10px] sm:min-w-[300px]"
        />
      )}

       {isInput&&(
        <input 
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#ffb3e6] bg-transparent font-epilogue text-[#ffb3e6] text-[14px] placeholder:text-[#e60099] rounded-[10px] sm:min-w-[300px]"
        />
      )}

      {isSelect &&  
        <select 
        required
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#ffb3e6] bg-transparent font-epilogue text-[#e60099] text-[14px] placeholder:text-[#e60099] rounded-[10px] sm:min-w-[300px]"
        >
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Poverty">Poverty</option>
          <option value="Accident">Accident</option>
          <option value="Social Service">Social Service</option>
          <option value="Innovation">Innovation</option>
          <option value="Startup">Startup</option>
          <option value="Politics">Politics</option>
        </select>
      }
    </label>
  )
}

export default FormField