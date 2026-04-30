import React, { useState, useRef } from "react";
import { MdImage } from "react-icons/md";
import { LuSendHorizontal } from "react-icons/lu";
import { chatStore } from "../store/chatStore";

const MessageInput = () => {
  const { sendMessage } = chatStore();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;

    try {
      await sendMessage({ text: text.trim(), image });
      setText("");
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("failed to send message", error);
    }
  };

  return (
    <div>
      {/* Image Preview */}
      {image && (
        <div className="mb-2 relative w-24">
          <img src={image} className="rounded-lg" />
          <button
            onClick={() => setImage(null)}
            className="absolute top-0 right-0 bg-black/70 text-white text-xs px-1 rounded"
          >
            ✕
          </button>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-full"
      >
        {/* Image Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="text-gray-300 hover:text-white"
        >
          <MdImage className="w-6 h-6" />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImage}
        />

        {/* Input */}
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Send */}
        <button
          type="submit"
          disabled={!text.trim() && !image}
          className={`p-2 rounded-full ${
            text.trim() || image
              ? "bg-indigo-600 text-white"
              : "bg-gray-600 text-gray-400"
          }`}
        >
          <LuSendHorizontal />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;