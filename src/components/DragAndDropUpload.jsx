import { useState } from "react";
import downloadIcon from "../assets/icon.svg";

const DragAndDropUpload = ({ uploadImage, imageUploading, uploadedImage }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  return (
    <div
      className={`md:border border-[#07373F] rounded-[24px] mb-[32px] md:p-[24px] pb-[32px] md:pb-[48px] md:bg-[#052228]
        ${isDragging ? "border-blue-500 bg-[#0E464F]" : "border-[#07373F]"}
        transition-all`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label className="text-[#FAFAFA]">Upload Profile Photo</label>

      {/* Drag & Drop Area */}
      <div className="md:bg-[#00000033] h-[200px] w-full relative mt-[32px]">
        <div
          className={`flex justify-center items-center w-[240px] h-[240px] mx-auto left-0 right-0 -top-[20px] md:p-6 border-4 bg-[#0E464F] rounded-[32px] cursor-pointer relative
      ${isDragging ? "border-blue-500 bg-[#0E464F]" : "border-[#24A0B5]"}`}
          onClick={() => document.getElementById("fileInput").click()}
        >
          {uploadedImage ? (
            <>
              {/* Uploaded Image */}
              <img
                src={uploadedImage}
                alt="Avatar"
                className="absolute inset-0 h-full mx-auto object-cover rounded-[24px]"
              />

              {/* Overlay */}
              <div className="h-[240px] absolute inset-0 bg-black/50 bg-opacity-50 flex flex-col gap-[22.67px] justify-center items-center text-white rounded-[24px] opacity-0 hover:opacity-100 transition-opacity duration-300">
                <img src={downloadIcon} alt="Upload" width={27} height={19} />
                <p className="text-[#FAFAFA] leading-[150%] text-center max-w-[10rem]">
                  Drag & drop or click to upload
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-[22.67px] items-center">
              <img src={downloadIcon} alt="" width={27} height={19} />
              <p className="text-[#FAFAFA] leading-[150%] text-center max-w-[10rem]">
                {isDragging ? "Drop here..." : "Drag & Drop or Click to Upload"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Uploading State */}
      {imageUploading && (
        <p className="text-[#FAFAFA] md:mt-2 mt-6">Uploading, Please wait...</p>
      )}
    </div>
  );
};

export default DragAndDropUpload;
