import React from 'react'
import { loader } from '../assets'

const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.92)] flex items-center justify-center flex-col">
    <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain"/>
    <p className="mt-[20px] font-epilogue  font-extrathin text-4xl text-pink-200 text-center">Hang tight...<br />Cuz we're doin' this right 😉</p>
  </div>
  )
}

export default Loader