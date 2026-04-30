import React from "react";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto] bg-gray-900">
      
      {/* Header */}
      <div>
        <ChatHeader />
      </div>

      {/* Messages (ONLY SCROLL AREA) */}
      <div className="overflow-y-auto">
        <Messages />
      </div>

      {/* Input (ALWAYS VISIBLE) */}
      <div className="bg-gray-800 border-t border-gray-700 px-2 py-2">
        <MessageInput />
      </div>

    </div>
  );
};

export default ChatContainer;