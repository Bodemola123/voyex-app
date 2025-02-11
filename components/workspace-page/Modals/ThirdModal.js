import Image from 'next/image';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { IoMdInformationCircle } from 'react-icons/io';
import '../../../app/globals.css'
import FileUpload from './FileUpload';

const ThirdModal = ({ openModal, closeModal, modalData, setModalData }) => {
  const [individualFiles, setIndividualFiles] = useState([]);
  const [zipFile, setZipFile] = useState(null);

  // Handle the modal close action
  const handleClose = () => {
    closeModal(); // Close the modal and reset the data
  };

// Handle file upload for Individual Files
const handleIndividualFileUpload = (file) => {
  const updatedFiles = [...individualFiles, file];
  setIndividualFiles(updatedFiles);
  setModalData((prevData) => ({
    ...prevData,
    individualFiles: updatedFiles, // Save to modalData
  }));
};

// Handle file removal for Individual Files
const handleIndividualFileRemove = (file) => {
  const updatedFiles = individualFiles.filter((f) => f !== file);
  setIndividualFiles(updatedFiles);
  setModalData((prevData) => ({
    ...prevData,
    individualFiles: updatedFiles, // Save to modalData
  }));
};

// Handle file upload for Zip Files
const handleZipFileUpload = (file) => {
  setZipFile(file);
  setModalData((prevData) => ({
    ...prevData,
    zipFile: file, // Save to modalData
  }));
};

// Handle file removal for Zip Files
const handleZipFileRemove = () => {
  setZipFile(null);
  setModalData((prevData) => ({
    ...prevData,
    zipFile: null, // Remove from modalData
  }));
};


  // Validate and proceed to the next modal
  const handleNext = () => {
    if (individualFiles.length === 0 && !zipFile) {
      alert("Please upload at least one file before proceeding.");
      return;
    }
    openModal(); // Proceed to the next modal
  };

  return (
    <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
      <div className='bg-[#000000] text-white rounded-[41px] p-[26px] shadow-xl w-[90%] max-w-[794px] h-[99.9%] flex flex-col gap-[14px]'>
        <div className="flex justify-between items-center border-gray-700">
          <h2 className="text-xl md:text-2xl font-bold">Model Files</h2>
          <button onClick={handleClose} className="flex items-center justify-center">
            <Image src={"/close-square.svg"} alt="X" width={58} height={58} />
          </button>
        </div>
        <section className='overflow-y-auto scrollbar-hide'>
          <Tabs defaultValue="individual" className="w-[740px] flex flex-col gap-[8px]">
            <TabsList className="grid w-[353px] grid-cols-2 bg-card/30 text-fontlight rounded-[21px]">
              <TabsTrigger value="individual" className="capitalize rounded-[31px] data-[state=active]:bg-black data-[state=active]:text-fontlight">
                Individual Files
              </TabsTrigger>
              <TabsTrigger value="zip" className="capitalize rounded-[31px] data-[state=active]:bg-black data-[state=active]:text-fontlight">
                Zip Files
              </TabsTrigger>
            </TabsList>
            <TabsContent value="individual">
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-row items-center justify-start gap-2'>
                    <p className='text-[#ffffff] font-medium text-base'>Model Files</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger><IoMdInformationCircle className='text-base text-[#f4f4f4]' /></TooltipTrigger>
                        <TooltipContent>
                          <p>Send the Model Files I will need...</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className='flex gap-2.5 w-full h-[188px] bg-[#131314] p-4 justify-center items-center rounded-[26px]'>
                    <FileUpload
                      onFileUpload={handleIndividualFileUpload}
                      uploadedFile={individualFiles[0]} // Display the first file if uploaded
                      onFileRemove={() => handleIndividualFileRemove(individualFiles[0])}
                    />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-[29px]'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center justify-start gap-2'>
                      <p className='text-[#ffffff] font-medium text-base'>Script Files</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger><IoMdInformationCircle className='text-base text-[#f4f4f4]' /></TooltipTrigger>
                          <TooltipContent>
                            <p>Send the Script Files I will need...</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className='flex gap-2.5 w-[355px] h-[188px] bg-[#131314] p-4 justify-center items-center rounded-[26px]'>
                      <FileUpload
                        onFileUpload={handleIndividualFileUpload}
                        uploadedFile={individualFiles[1]} // Display the second file if uploaded
                        onFileRemove={() => handleIndividualFileRemove(individualFiles[1])}
                      />
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center justify-start gap-2'>
                      <p className='text-[#ffffff] font-medium text-base'>Script files</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger><IoMdInformationCircle className='text-base text-[#f4f4f4]' /></TooltipTrigger>
                          <TooltipContent>
                            <p>Send the Script Files I will need...</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className='flex gap-2.5 w-[355px] h-[188px] bg-[#131314] p-4 justify-center items-center rounded-[26px]'>
                      <FileUpload
                        onFileUpload={handleIndividualFileUpload}
                        uploadedFile={individualFiles[2]} // Display the third file if uploaded
                        onFileRemove={() => handleIndividualFileRemove(individualFiles[2])}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="zip">
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-row items-center justify-start gap-2'>
                    <p className='text-[#ffffff] font-medium text-base'>Model Files</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger><IoMdInformationCircle className='text-base text-[#f4f4f4]' /></TooltipTrigger>
                        <TooltipContent>
                          <p>Send the Model Files I will need...</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className='flex gap-2.5 w-full h-[188px] bg-[#131314] p-4 justify-center items-center rounded-[26px]'>
                    <FileUpload
                      onFileUpload={handleZipFileUpload}
                      uploadedFile={zipFile}
                      onFileRemove={handleZipFileRemove}
                      fileType="zip" // Specify that this FileUpload accepts .zip files
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Buttons Section */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm md:text-base bg-transparent text-white border border-[#FFFFFF26] rounded-[25px] hover:bg-gray-800 hover:border-[#c088fb] hover:scale-105 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleNext}
            disabled={individualFiles.length === 0 && !zipFile}
            className={`px-4 py-2 text-sm md:text-base bg-[#C088FB] text-[#0A0A0B] rounded-[25px] hover:scale-105 transition-all ${
              individualFiles.length > 0 || zipFile ? "" : "cursor-not-allowed opacity-50"
            }`}
          >
            Update API Schema
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThirdModal;