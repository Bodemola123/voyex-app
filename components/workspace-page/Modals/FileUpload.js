import { useRef } from "react";
import { SlCloudUpload } from "react-icons/sl";

const FileUpload = ({ onFileUpload, uploadedFile, onFileRemove }) => {
    const fileInputRef = useRef(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        validateAndUpload(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        validateAndUpload(file);
    };

    const validateAndUpload = (file) => {
        if (!file) return;

        // Validate file type
        const validTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (!validTypes.includes(file.type)) {
            alert("Invalid file type. Please upload a PDF, DOC, or DOCX file.");
            return;
        }

        // Validate file size (100MB limit)
        const maxSize = 100 * 1024 * 1024; // 100MB in bytes
        if (file.size > maxSize) {
            alert("File size exceeds the 100MB limit.");
            return;
        }

        // If valid, call the onFileUpload callback
        onFileUpload(file);
    };

    return (
        <div
            className="flex justify-center items-center gap-2.5 flex-col w-[400px] h-[156px] border-dashed border rounded-[14px] border-[#CCD6E0] relative bg-[#131314] cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            role="button"
            tabIndex={0}
            aria-label="File upload area"
        >
            {uploadedFile ? (
                <div className="relative flex justify-center items-center w-full h-full bg-[#1E1E1E] rounded-[14px]">
                    <p className="text-white text-sm text-center">{uploadedFile.name}</p>
                    <button
                        className="absolute top-2 right-2 bg-black text-white text-xs rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            onFileRemove();
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
                    <button
                        className="border-b border-[0.48px] flex items-center justify-center rounded-[26px] py-2.5 px-5 bg-[#C088FB] text-[#0a0a0b] text-xs font-medium hover:bg-purple/50"
                        onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current.click();
                        }}
                        aria-label="Browse files"
                    >
                        Browse files
                    </button>
                </>
            )}
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

export default FileUpload;