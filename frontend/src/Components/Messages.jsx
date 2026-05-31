import { chatStore } from "../store/chatStore";
import { authStore } from "../store/authStore";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
  const [loadingImages, setLoadingImages] = useState({});

  useEffect(() => {
    if (selectedUser?._id) getMessages();

    listenForNewMessage();
    return () => stopListeningForMessages();
  }, [selectedUser?._id]);

  useEffect(() => {
    // Reset loading states when messages change
    const newLoadingStates = {};
    messages.forEach((msg) => {
      if (msg.image && !loadingImages.hasOwnProperty(msg._id)) {
        newLoadingStates[msg._id] = true; // Mark as loading initially
      }
    });
    if (Object.keys(newLoadingStates).length > 0) {
      setLoadingImages((prev) => ({ ...prev, ...newLoadingStates }));
    }
  }, [messages.length]); // Only when new messages arrive

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  const handleImageLoad = (messageId) => {
    setLoadingImages((prev) => ({
      ...prev,
      [messageId]: false,
    }));
  };

  const handleImageStartLoad = (messageId) => {
    setLoadingImages((prev) => ({
      ...prev,
      [messageId]: true,
    }));
  };

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
        const isOwn = String(message.senderId) === String(loggedUser?._id);

        return isOwn ? (
          <div key={message._id} className="flex justify-end">
            <div className="bg-blue-500 text-white px-3 py-2 rounded-2xl max-w-xs">
              {message.image && (
                <div className="relative mb-2 w-full">
                  {loadingImages[message._id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-700 rounded-lg">
                      <AiOutlineLoading3Quarters className="w-6 h-6 animate-spin text-white" />
                    </div>
                  )}
                  <img 
                    src={message.image} 
                    alt="message" 
                    className="rounded-lg max-w-full"
                    onLoadStart={() => handleImageStartLoad(message._id)}
                    onLoad={() => handleImageLoad(message._id)}
                  />
                </div>
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ) : (
          <div key={message._id} className="flex">
            <div className="bg-gray-200 px-3 py-2 rounded-2xl max-w-xs">
              {message.image && (
                <div className="relative mb-2 w-full">
                  {loadingImages[message._id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-300 rounded-lg">
                      <AiOutlineLoading3Quarters className="w-6 h-6 animate-spin text-gray-600" />
                    </div>
                  )}
                  <img 
                    src={message.image} 
                    alt="message" 
                    className="rounded-lg max-w-full"
                    onLoadStart={() => handleImageStartLoad(message._id)}
                    onLoad={() => handleImageLoad(message._id)}
                  />
                </div>
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        );
      })}

      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default Messages;