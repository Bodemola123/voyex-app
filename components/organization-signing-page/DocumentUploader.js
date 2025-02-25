import { useRef, useState, useEffect } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { FaSpinner, FaCheck } from "react-icons/fa";
import '../../app/globals.css'

const DocumentUploader = ({ onFileUpload, onFileRemove, uploadedFile }) => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(uploadedFile || null); // Initialize state with the uploadedFile prop
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  // Update local state when the uploadedFile prop changes
  useEffect(() => {
    setFile(uploadedFile);
  }, [uploadedFile]);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    validateAndUpload(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    validateAndUpload(selectedFile);
  };

  const validateAndUpload = (selectedFile) => {
    if (!selectedFile) return;

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(selectedFile.type)) {
      alert("Invalid file type. Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    const maxSize = 100 * 1024 * 1024; // 100MB limit
    if (selectedFile.size > maxSize) {
      alert("File size exceeds the 100MB limit.");
      return;
    }

    setFile(selectedFile); // Update local state with the selected file
    setIsUploading(true);
    simulateUpload(selectedFile);
  };

  const simulateUpload = (file) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadComplete(true);
        onFileUpload(file); // Notify parent about the successful upload
      }
    }, 500);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadComplete(false);
    onFileRemove(); // Notify parent about file removal
  };

  return (
    <div
      className="flex justify-center items-center gap-2.5 flex-col w-full h-[156px] border-dashed border-[2px] rounded-[14px] border-[#CCD6E0] relative bg-[#131314] cursor-pointer"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
      role="button"
      tabIndex={0}
      aria-label="File upload area"
    >
      {file ? (
        <div className="flex flex-col items-center w-full">
          <p className="text-[#c088fb] text-base text-center">
            {uploadComplete ? "File Uploaded" : "Uploading File"}
          </p>
          <div className="flex flex-row items-center gap-6 mt-2">
            <div className="relative w-[404px] h-[8px] bg-white rounded-[15px] overflow-hidden">
              <div
                className="h-full bg-[#c088fb] transition-all duration-500"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-[#c088fb] text-sm">
              {uploadComplete ? <FaCheck /> : `${uploadProgress}%`}
            </p>
          </div>
          <button
            className="absolute top-2 right-2 bg-[#ccd6e0] text-[#c088fb] text-xs rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFile();
            }}
            aria-label="Remove file"
          >
            ✕
          </button>
        </div>
      ) : (
        <>
          <SlCloudUpload className="text-[24px] text-[#c088fb]" />
          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold text-[#c088fb] text-center">
              Drag & Drop your File here or Browse Files
            </p>
            <p className="text-xs font-bold text-[#888292] text-center">
              Works with any DOC, DOCX, PDF below 100MB
            </p>
          </div>
        </>
      )}
      <button
        className="border-b border-[0.48px] flex items-center justify-center rounded-[26px] py-2.5 px-5 bg-[#C088FB] text-[#0a0a0b] text-sm font-black hover:bg-[#c088fb]/50"
        onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current.click();
        }}
        aria-label="Browse files"
        disabled={uploadComplete} // Button disabled after upload completion
      >
        {isUploading ? <FaSpinner className="animate-spin" /> : uploadComplete ? "Continue" : "Browse files"}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.doc,.docx"
        onChange={handleFileSelect}
        aria-label="File input"
      />
    </div>
  );
};

export default DocumentUploader;
