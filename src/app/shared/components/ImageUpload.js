'use client'
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiFile, FiXCircle } from 'react-icons/fi';

const ImageUpload = ({ onFileSelect }) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorTimeoutId, setErrorTimeoutId] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]; // Handling single file
    if (!file) return; // If no file, do nothing

    if (file) {
      onFileSelect(file);
    }

    // Check for file size limit (2MB)
    if (file.size > 2097152) {
      const newErrorMessage = "File size should not exceed 2MB.";
      setErrorMessage(newErrorMessage);
      const timeoutId = setTimeout(() => {
        setErrorMessage('');
        setErrorTimeoutId(null);
      }, 10000); // Clear the error after 10 seconds
      setErrorTimeoutId(timeoutId);
      return;
    }
    setIsUploading(true); // Start the upload indicator

    // Setup file reader for image preview (if image)
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      setFiles([{
        name: file.name,
        size: file.size,
        type: file.type,
        preview: reader.result
      }]);
    };

    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file);
    } else {
      setFiles([{
        name: file.name,
        size: file.size,
        type: file.type,
        preview: null
      }]);
    }

    mockUpload(file);
  }, [onFileSelect]);

  const mockUpload = (file) => {
    // Simulate an upload process
    const uploadInterval = setInterval(() => {
      setUploadProgress(prevProgress => {
        const progress = (prevProgress[file.name] || 0) + 10;
        if (progress >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
        }
        return { ...prevProgress, [file.name]: progress };
      });
    }, 500);
  };

  const removeFile = (fileName) => {
    setFiles([]); // Clear the file list
    setUploadProgress({}); // Reset upload progress
    setIsUploading(false); // Reset uploading state
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="container mx-auto">
      {files.length === 0 && (
        <div {...getRootProps()} className="border-dashed border-2 border-blue-200 py-[30px] px-[40px] text-center cursor-pointer bg-[#007eef0d] gap-8 rounded-md">
          <input {...getInputProps()} />
          <div className='flex justify-center tracking-wide font-bold mb-4'>
            <FiUpload size={24} />
            <p className='ml-5'>Drag & drop files or <span className='text-[#0057A5] font-bold'>Browse</span></p>
          </div>
          <div className='flex-col justify-center tracking-wide text-gray-400 text-[13px]'>
            <p> Supported formats: JPEG, PNG, PDF, Word</p>
            <p> Max file size : 2MB</p>
          </div>
        </div>
      )}
      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}
      <div className="mt-4 space-y-4">
        {files.map((file, index) => (
          <div key={index} className="relative px-8 py-2 text-black rounded-md border flex items-center">
            <div className="flex">
              <div className="">
                <span><FiFile size={22} color="#28C1A2" /></span>
              </div>
              <div className='ml-2'>
                <p className="text-[14px] truncate w-48"> {file.name}</p>
                <p className="text-[12px] text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>

            <button onClick={() => removeFile(file.name)} className="ml-auto p-2 rounded-full">
              <FiXCircle size={24} color="#D64564" />
            </button>
            {isUploading && (
              <div className="absolute bottom-0 left-0 right-0 bg-gray-700 rounded-b-md h-1">
                <div className="bg-gradient-to-r from-blue-500 to-[#6ADF23] h-1 rounded-b-md" style={{ width: `${uploadProgress[file.name]}%` }}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
