import React from 'react'
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import MessageInput from './MessageInput';
const ChatContainer = () => {
  return (
    <div className='flex flex-col h-full bg-base-100 shadow-lg md:w-auto'>
      <ChatHeader />
      <div className='flex-1 overflow-y-auto'>
      <Messages />
      </div>
       <div className='flex-shrink-1 p-4 bg-base-200'>
        <MessageInput />
       </div>

    </div>
  )
}

export default ChatContainer