import React, { useState, useRef } from "react";
import { MdImage } from "react-icons/md";
import { LuSendHorizontal } from "react-icons/lu";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { chatStore } from "../store/chatStore";

const MessageInput = () => {
  const { sendMessage } = chatStore();
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImagePreview(reader.result);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imageFile) return;

    setIsLoading(true);
    try {
      await sendMessage({ text: text.trim(), imageFile });
      setText("");
      setImageFile(null);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("failed to send message", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-2 relative w-24">
          <img src={imagePreview} className="rounded-lg" />
          <button
            onClick={() => {
              setImageFile(null);
              setImagePreview(null);
            }}
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
          disabled={isLoading}
          className={`text-gray-300 hover:text-white cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <MdImage className="w-6 h-6" />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImage}
          disabled={isLoading}
        />

        {/* Input */}
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 disabled:opacity-50"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />

        {/* Send */}
        <button
          type="submit"
          disabled={(!text.trim() && !imageFile) || isLoading}
          className={`p-2 rounded-full flex items-center justify-center ${
            (text.trim() || imageFile) && !isLoading
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
          ) : (
            <LuSendHorizontal />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;