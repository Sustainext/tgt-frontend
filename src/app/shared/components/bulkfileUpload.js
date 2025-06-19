"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { MdFilePresent } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const BulkfileUpload = ({ onFileSelect, format, setIsFileUploaded, accept }) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorTimeoutId, setErrorTimeoutId] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]; // Only one file handled

      if (!file) return;

      // Check for file size limit (5MB)
      if (file.size > 5 * 1024 * 1024) {
        const newErrorMessage = "File size should not exceed 5MB.";
        setErrorMessage(newErrorMessage);
        const timeoutId = setTimeout(() => {
          setErrorMessage("");
          setErrorTimeoutId(null);
        }, 10000); // Clear error after 10 seconds
        setErrorTimeoutId(timeoutId);
        return;
      }

      if (onFileSelect) {
        onFileSelect(file);
      }

      setIsUploading(true); // Start upload indicator

      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        setFiles([
          {
            name: file.name,
            size: file.size,
            type: file.type,
            preview: file.type.startsWith("image/") ? reader.result : null,
          },
        ]);
      };

      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file);
      } else {
        setFiles([
          {
            name: file.name,
            size: file.size,
            type: file.type,
            preview: null,
          },
        ]);
      }

      mockUpload(file);
    },
    [onFileSelect]
  );

  const mockUpload = (file) => {
    const uploadInterval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const progress = (prevProgress[file.name] || 0) + 10;
        if (progress >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          if (setIsFileUploaded) {
            setIsFileUploaded(true);
          }
        }
        return { ...prevProgress, [file.name]: progress };
      });
    }, 500);
  };

  const removeFile = (fileName) => {
    setFiles([]);
    setUploadProgress({});
    setIsUploading(false);
    if (setIsFileUploaded) {
      setIsFileUploaded(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  return (
    <div className="container mx-auto">
      {files.length === 0 && (
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-blue-200 py-[20px] px-[20px] text-center cursor-pointer bg-[#007eef0d] gap-8 rounded-md"
        >
          <input {...getInputProps()} />
          <div className="flex justify-center tracking-wide font-bold mb-2">
            <FiUpload size={20} style={{ color: "#454545" }} />
            <p className="ml-4 text-[15px] text-[#454545]">
              Drag & drop files or{" "}
              <span className="text-[#0057A5] font-bold">Browse</span>
            </p>
          </div>
          <div className="flex-col justify-center tracking-wide text-gray-400 text-sm">
            <p>Supported format: .xlsx | Max file size: 5MB</p>
          </div>
        </div>
      )}
      {errorMessage && (
        <p className="text-red-500 text-center mt-2">{errorMessage}</p>
      )}
      <div className="mt-4 space-y-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="relative px-3 py-2 text-black rounded-md border flex items-center"
          >
            <div className="flex items-center">
              <div className="text-2xl">
                <MdFilePresent color="#28C1A2" size={24} />
              </div>
              <div className="ml-2">
                <p className="text-[14px] truncate w-48">{file.name}</p>
                <p className="text-[12px] text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              onClick={() => removeFile(file.name)}
              className="ml-auto p-2 rounded-full"
            >
              <RiDeleteBin6Line size={22} color="#D64564" />
            </button>

            {isUploading && (
              <div className="absolute bottom-0 left-0 right-0 bg-gray-700 rounded-b-md h-1">
                <div
                  className="bg-gradient-to-r from-blue-500 to-[#6ADF23] h-1 rounded-b-md"
                  style={{ width: `${uploadProgress[file.name] || 0}%` }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BulkfileUpload;
