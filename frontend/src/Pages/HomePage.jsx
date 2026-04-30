import React from "react";
import Sidebar from "../Components/Sidebar";
import ChatContainer from "../Components/ChatContainer";
import { chatStore } from "../store/chatStore";
import NoChatSelected from "../Components/NoChartSelected";

const HomePage = () => {
  const { selectedUser } = chatStore();

  return (
    <div className="flex h-full w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat Area */}
      <div className="flex-1 h-full overflow-hidden">
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </div>
    </div>
  );
};

export default HomePage;