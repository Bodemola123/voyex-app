'use client'
import React, { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";
import { VscSend } from "react-icons/vsc";
import { GrAttachment } from "react-icons/gr";
import { GrMicrophone } from "react-icons/gr";
import { IoArrowUp } from "react-icons/io5";
import { HiXMark } from "react-icons/hi2";

function ChatInput({
  userInput,
  setUserInput,
  handleSendMessage,
  handleNewConversation,
  isLoading,
  isBotTyping,
}) {

  const [attachedFile, setAttachedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState("");
  const [isClient, setIsClient] = useState(false); // To track if we're on the client
  const [uploadSuccessful, setUploadSuccessful] = useState(false); // Track if upload is valid

    // Set isClient to true when the component has mounted on the client
    useEffect(() => {
      setIsClient(true);
    }, []);
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // Prevents new line
        handleSendMessage();
        setUserInput(""); 
      }
    };
    
    

  const handleButtonPress = (e) => {
    handleSendMessage();
  };
  const handleFileChange = (event) => {
    setAttachedFile(event.target.files[0]);
  };
  // Remove attached file
  const handleRemoveFile = () => {
    setAttachedFile(null);
    setAudioBlobUrl(""); // Reset audio
  };
    // Handle upload action
    const handleUpload = () => {
      if (userInput || attachedFile) {
        setUserInput("")
        setAttachedFile(null);
        setAudioBlobUrl(""); // Reset audio
        setUploadSuccessful(true); // Mark upload as successful
      } else {
        setUploadSuccessful(false); // Set upload to unsuccessful
        alert("Please provide text or attach a file before uploading.");
      }
    };

        // Only render the ReactMediaRecorder component on the client side
        if (!isClient) {
          return (
            <div className="flex items-center bg-black rounded-full px-4 py-2 space-x-3 shadow-lg w-full">
<textarea
  placeholder="Start Exploration"
  value={userInput}
  onChange={(e) => setUserInput(e.target.value)}
  disabled={isBotTyping}
  onKeyDown={isBotTyping ? (e) => e.preventDefault() : handleKeyPress}
  className={`flex-grow bg-black text-white placeholder-gray-500 outline-none 
              placeholder:text-base placeholder:font-medium font-medium 
              resize-none scrollbar-hide scroll-container max-h-[112px] 
              rounded-lg px-3 py-2 ${isLoading ? "cursor-not-allowed" : ""}`}
  rows={1} 
/>

              <button
                onClick={handleUpload}
                className="flex items-center justify-center w-8 h-8 bg-purple-500 rounded-full focus:outline-none"
              >
                <GrMicrophone
                  className={`text-[20px] ${isRecording ? "text-red-500" : "text-[#94a3b8]"}`}
                />
              </button>
            </div>
          );
        }
  return (
    <div className="flex items-center justify-center gap-4 w-[573px]">
    <div className="flex items-center rounded-full px-4 py-2 space-x-3 shadow-lg w-full bg-[#1c1d1f]">
      {/* File attachment icon */}
      <label className="cursor-pointer">
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*, video/*, audio/*"
        />
        <GrAttachment className={`text-[#94a3b8] text-[20px]${
              isLoading ? "cursor-not-allowed" : ""
            }`} />
      </label>

      {/* Display the file (image/video) */}
      {attachedFile && attachedFile.type.startsWith("image/") && (
        <div className="relative">
          <img
            src={URL.createObjectURL(attachedFile)}
            alt="Attachment"
            className="w-14 h-14 object-cover rounded-lg"
          />
          <button
            onClick={handleRemoveFile}
            className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
          >
            <HiXMark className="text-[#ffffff]" />
          </button>
        </div>
      )}
      {attachedFile && attachedFile.type.startsWith("video/") && (
        <div className="relative">
          <video
            controls
            className="w-14 h-14 object-cover rounded-lg"
            src={URL.createObjectURL(attachedFile)}
          />
          <button
            onClick={handleRemoveFile}
            className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
          >
            <HiXMark className="text-[#ffffff]" />
          </button>
        </div>
      )}
         {audioBlobUrl && (
      <div className="relative">
        <audio controls className="w-14 h-14">
          <source src={audioBlobUrl} type="audio/mpeg" />
        </audio>
        <button
          onClick={() => {
            console.log("Audio file being removed..."); // Debugging line to check removal
            setAudioBlobUrl(""); // Reset the audio URL
          }}
          className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
        >
          <HiXMark className="text-[#ffffff]" />
        </button>
      </div>
    )}

      {/* Expandable Input field */}
      <div className="relative w-full flex items-center justify-center my-auto">
      <textarea
  placeholder="Start Exploration"
  value={userInput}
  onChange={(e) => setUserInput(e.target.value)}
  disabled={isLoading || isBotTyping} // Disable input while bot is typing
  onKeyDown={isBotTyping ? (e) => e.preventDefault() : handleKeyPress} // Block keypress when bot is typing
  className={`flex-grow bg-[#1c1d1f] text-white placeholder-gray-500 outline-none 
              placeholder:text-base placeholder:font-medium font-medium 
              resize-none scrollbar-hide scroll-container max-h-[112px] 
              rounded-lg px-3 py-2 
              ${isLoading || isBotTyping ? "opacity-50" : ""}`} 
  rows={1} 
/>


      </div>
      
                <button
                  className="focus:outline-none"
                >
                  <GrMicrophone
                    className={`text-[20px] text-[#94a3b8]`}
                  />
                </button>
      

      {/* Upload button */}
        {/* Upload button */}
        <button
          className={`flex items-center justify-center p-1.5 bg-[#C088fb] rounded-full focus:outline-none ${
            isLoading || isBotTyping && !attachedFile ? "opacity-50" : ""
          }`}
          onClick={() => { handleButtonPress(); handleUpload(); }}
          disabled={isLoading || isBotTyping}
        >
          <IoArrowUp className="text-[#ffffff] text-[24px]" />
        </button>
    </div>
    </div>
  );
}

export default ChatInput;
