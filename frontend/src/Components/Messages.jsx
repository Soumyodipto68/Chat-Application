import { chatStore } from "../store/chatStore";
import { authStore } from "../store/authStore";
import { useEffect, useRef } from "react";

const Messages = () => {
  const {
    selectedUser,
    getMessages,
    messages,
    listenForNewMessage,
    stopListeningForMessages,
  } = chatStore();

  const { loggedUser } = authStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) getMessages();

    listenForNewMessage();
    return () => stopListeningForMessages();
  }, [selectedUser?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        No messages yet
      </div>
    );
  }

  return (
    <div className="flex flex-col px-3 py-2 space-y-3">
      {messages.map((message) => {
        const isOwn = message.senderId === loggedUser?._id;

        return isOwn ? (
          <div key={message._id} className="flex justify-end">
            <div className="bg-blue-500 text-white px-3 py-2 rounded-2xl max-w-xs">
              {message.text}
            </div>
          </div>
        ) : (
          <div key={message._id} className="flex">
            <div className="bg-gray-200 px-3 py-2 rounded-2xl max-w-xs">
              {message.text}
            </div>
          </div>
        );
      })}

      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default Messages;