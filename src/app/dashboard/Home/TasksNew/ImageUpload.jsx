import React, { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";

const ImageUpload = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full cursor-pointer flex items-center gap-2 text-gray-500 hover:text-gray-700"
    >
      <FiUploadCloud className="text-xl" />
      <div>
        <p className="text-sm">Click to upload document</p>
        <p className="text-xs text-gray-400">PDF, images or Excel (max 5MB)</p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.xls,.xlsx"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUpload;
