import { useRef } from "react";
import { SlCloudUpload } from "react-icons/sl";

const ImageUpload = ({ onImageUpload, uploadedImage, onImageRemove }) => {
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

        // Validate file type (images and SVGs)
        const validTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/svg+xml", // Added SVG support
        ];
        if (!validTypes.includes(file.type)) {
            alert("Invalid file type. Please upload a JPEG, PNG, GIF, WEBP, or SVG image.");
            return;
        }

        // Validate file size (10MB limit)
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (file.size > maxSize) {
            alert("File size exceeds the 10MB limit.");
            return;
        }

        // If valid, call the onImageUpload callback
        onImageUpload(file);
    };

    return (
        <div
            className="flex justify-center items-center gap-2.5 flex-col w-[708px] min-h-[156px] border-dashed border rounded-[14px] border-[#CCD6E0] relative bg-[#131314] cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            role="button"
            tabIndex={0}
            aria-label="Image upload area"
        >
            {uploadedImage ? (
                <div className="relative flex justify-center items-center w-full max-h-[156px] bg-[#1E1E1E] rounded-[14px]">
 {uploadedImage?.url ? (
  <img
    src={uploadedImage.url}
    alt="Uploaded"
    className="max-w-full max-h-full rounded-[14px]"
  />
) : uploadedImage instanceof File ? (
  <img
    src={URL.createObjectURL(uploadedImage)}
    alt="Uploaded File"
    className="max-w-full max-h-full rounded-[14px]"
  />
) : null}

                    <button
                        className="absolute top-2 right-2 bg-black text-white text-xs rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            onImageRemove();
                        }}
                        aria-label="Remove image"
                    >
                        ✕
                    </button>
                </div>
            ) : (
                <>
                    <SlCloudUpload className="text-[24px] text-[#c088fb]" />
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-bold text-[#c088fb] text-center">
                            Drag & Drop your Image here or Browse
                        </p>
                        <p className="text-xs font-bold text-[#888292] text-center">
                            Works with JPEG, PNG, GIF, WEBP, or SVG below 10MB
                        </p>
                    </div>
                    <button
                        className="border-b border-[0.48px] flex items-center justify-center rounded-[26px] py-2.5 px-5 bg-[#C088FB] text-[#0a0a0b] text-xs font-medium hover:bg-purple/50"
                        onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current.click();
                        }}
                        aria-label="Browse images"
                    >
                        Browse images
                    </button>
                </>
            )}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg, image/png, image/gif, image/webp, image/svg+xml"
                onChange={handleFileSelect}
                aria-label="Image input"
            />
        </div>
    );
};

export default ImageUpload;