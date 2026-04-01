import React from 'react'
import Sidebar from '../Components/Sidebar'
import ChatContainer from '../Components/ChatContainer'
import { chatStore } from '../store/chatStore'
import NoChartSelected from '../Components/NoChartSelected'
const HomePage = () => {
  const { selectedUser } = chatStore();
  return (
    <div className="flex flex-row min-h-screen overflow-hidden bg-base-100 rounded-lg shadow-cl w-full h-[calc(100vh-8rem)]">
      <Sidebar/>
      <main className='flex-1 bg-gray-700'>  
        {selectedUser ?<ChatContainer/>: <NoChartSelected/>}
      </main>


    </div>
  )
}

export default HomePage