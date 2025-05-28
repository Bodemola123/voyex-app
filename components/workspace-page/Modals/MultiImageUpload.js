import { useRef } from "react";
import { SlCloudUpload } from "react-icons/sl";

const MultiImageUpload = ({ uploadedImages = [], onImagesChange }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    validateAndUpload(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    validateAndUpload(files);
  };

  const validateAndUpload = (files) => {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    const validFiles = [];

    for (const file of files) {
      if (!validTypes.includes(file.type)) {
        alert(`Invalid file type: ${file.name}. Allowed types: JPEG, PNG, GIF, WEBP, SVG.`);
        continue;
      }
      if (file.size > maxSize) {
        alert(`File size exceeds 10MB: ${file.name}`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      // Append new valid files to existing uploadedImages
      onImagesChange([...uploadedImages, ...validFiles]);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    onImagesChange(updatedImages);
  };

  return (
    <div
      className="flex justify-center items-center gap-2.5 flex-col w-[708px] min-h-[156px] border-dashed border rounded-[14px] border-[#CCD6E0] relative bg-[#131314] cursor-pointer"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
      role="button"
      tabIndex={0}
      aria-label="Multiple image upload area"
    >
      {uploadedImages.length > 0 ? (
        <div className="flex flex-wrap gap-2 w-full max-h-[156px] overflow-y-auto p-2">
{uploadedImages.map((image, idx) => {
  const imageUrl =
    image instanceof File
      ? URL.createObjectURL(image)
      : image.url || null;

  return (
    <div
      key={idx}
      className="relative w-[140px] h-[140px] bg-[#1E1E1E] rounded-[14px] overflow-hidden flex items-center justify-center"
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Uploaded ${idx + 1}`}
          className="max-w-full max-h-full object-contain"
        />
      )}
      <button
        className="absolute top-1 right-1 bg-black text-white text-xs rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          removeImage(idx);
        }}
        aria-label={`Remove image ${idx + 1}`}
      >
        ✕
      </button>
    </div>
  );
})}

        </div>
      ) : (
        <>
          <SlCloudUpload className="text-[24px] text-[#c088fb]" />
          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold text-[#c088fb] text-center">
              Drag & Drop your Images here or Browse
            </p>
            <p className="text-xs font-bold text-[#888292] text-center">
              Works with JPEG, PNG, GIF, WEBP, or SVG total image uploaded 10MB
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
        multiple
        onChange={handleFileSelect}
        aria-label="Multiple image input"
      />
    </div>
  );
};

export default MultiImageUpload;
