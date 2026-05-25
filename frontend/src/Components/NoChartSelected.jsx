import React from 'react'
import { BiMessageEdit } from "react-icons/bi";
const NoChartSelected = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <BiMessageEdit className='text-6xl p-2' />
      <h1 className='text-2xl font-bold mb-4'>Welcome to Chatter Box</h1>
      <p className='text-black mb-4'>Select a chat to start messaging</p>
    </div>
  )
}

export default NoChartSelected