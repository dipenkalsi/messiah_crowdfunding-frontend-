import React from 'react'
import {Route,Routes} from 'react-router-dom'; 
import {CreateCampaign, CampaignDetails , Profile , Home } from './pages/index.js'
import {Navbar , Sidebar} from './components/index'
import { useStateContext } from './context/index.jsx';
const App = () => {
  const {theme} =useStateContext();
  return (
    <div className={`${theme}`}>
    <div className='relative sm:-8 p-4 bg-[#1a0000] min-h-screen flex flex-row'>
      <div className='sm:flex hidden mr-10 relative'>
        <Sidebar/>
      </div>
      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <Navbar/>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create-campaign" element={<CreateCampaign/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/campaign-details/:id" element={<CampaignDetails/>} />
        </Routes>
      </div>
    </div>
    </div>
  )
}

export default App
