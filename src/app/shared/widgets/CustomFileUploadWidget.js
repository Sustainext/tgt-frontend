'use client'
import React, { useState, useEffect } from 'react';
import { MdOutlineFileUpload, MdFilePresent, MdClose, MdDelete } from "react-icons/md";
import { BlobServiceClient } from '@azure/storage-blob';

const CustomFileUploadWidget = ({ id, onChange, value = {}, scopes,setFormData }) => {
  const [fileName, setFileName] = useState(value?.name || null);
  const [showModal, setShowModal] = useState(false);
  const [previewData, setPreviewData] = useState(value?.url || null);
  const [fileType, setFileType] = useState(value?.type || '');
  const [fileSize, setFileSize] = useState(value?.size || '');
  const [uploadDateTime, setUploadDateTime] = useState(value?.uploadDateTime || '');


const uploadFileToAzure = async (file, newFileName) => {
  // Read file content as ArrayBuffer
  console.log(file, ' is the file object')
  const arrayBuffer = await file.arrayBuffer();
  const blob = new Blob([arrayBuffer]);

  // Azure Storage configuration
  const accountName = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT;
  const containerName = process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER;
  const sasToken = process.env.NEXT_PUBLIC_AZURE_SAS_TOKEN;

  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net?${sasToken}`
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobName = newFileName || file.name; // Use newFileName or fallback to file name
  const blobClient = containerClient.getBlockBlobClient(blobName);

  try {
    // Upload the blob to Azure Blob Storage

    const uploadOptions = {
      blobHTTPHeaders: {
        blobContentType: file.type // Set the content type
      }
    };


    await blobClient.uploadData(blob,uploadOptions);
    const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

    return url;
  } catch (error) {
    console.error('Error uploading file:', error.message);
    alert('Error uploading file. Please check the console for more details.');
    return null;
  }
};





  useEffect(() => {

    console.log(value, ' is the new value')

    if (value?.url && value?.name) {
    

      setFileName(value.name);
      setPreviewData(value.url);
      setFileType(value.type || '');
      setFileSize(value.size || '');
      setUploadDateTime(value.uploadDateTime || '');
    }
  }, [value]);

  const handleChange = async (event) => {
    console.log('handle change called');
    const selectedFile = event.target.files[0];

    const newFileName = selectedFile ? selectedFile.name : null;
    console.log(selectedFile, ' is the selectedFile');
    setFileName(newFileName);
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
  
      reader.onloadend = () => {
        const base64String = reader.result;
        console.log(reader, ' is the reader object');
        
        const uploadAndSetState = async () => {
          const url = await uploadFileToAzure(selectedFile, newFileName);
          alert(url, ' is upload');
          
          onChange({
            name: newFileName,
            url: url,
            type: selectedFile.type,
            size: selectedFile.size,
            uploadDateTime: new Date().toLocaleString(),
          });
          
          setPreviewData(base64String);
          setFileType(selectedFile.type);
          setFileSize(selectedFile.size);
          setUploadDateTime(new Date().toLocaleString());
        };
  
        uploadAndSetState();
      };
    }
  };
  

  const handlePreview = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = (id, scopes) => {
    setFileName(null);
    setPreviewData(null);
    onChange(null); // Clear the selected file for the specific id and scopes
    setShowModal(false);
    setFormData(value) // Close the modal after deletion
  };

  return (
    <div className="w-[120px] flex justify-center items-center">
      <input
        type="file"
        id={id + scopes}
        onChange={handleChange}
        style={{ display: 'none' }}
      />

      {fileName ? (
        <label className="flex cursor-pointer">
          <div
            className="flex items-center mt-2"
            onClick={handlePreview}
          >
            <MdFilePresent
              className="w-6 h-6 mr-1 text-green-500"
            />
            <div className="w-[90px] truncate text-sky-600 text-sm">
              {fileName}
            </div>
          </div>
        </label>
      ) : (
        <label htmlFor={id + scopes} className="flex cursor-pointer">
          <div className="flex items-center mt-2">
            <MdOutlineFileUpload
              className="w-6 h-6 mr-1 text-[#007EEF]"
            />
            <div className="w-[90px] truncate text-[#007EEF] text-sm">
              Upload File
            </div>
          </div>
        </label>
      )}

      {/* Preview Modal */}
      {showModal && previewData && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-1 rounded-lg w-[60%] h-[90%] mt-6">
            <div className="flex justify-between mt-4 mb-4">
              <div>
                <h5 className="mb-4 ml-2 font-semibold">{fileName}</h5>
              </div>
              <div className='flex'>
                <div className='mb-4'>
                  <button className="px-2 py-1 mr-2 w-[150px] flex items-center justify-center border border-red-500 text-red-600 text-[13px] rounded hover:bg-red-600 hover:text-white" onClick={() => handleDelete(id, scopes)}>
                    <MdDelete className="text-xl" /> Delete File
                  </button>
                </div>
                <div>
                  <button className="px-4 py-2 text-xl rounded" onClick={handleCloseModal}><MdClose /></button>
                </div>
              </div>
            </div>
            <div className='flex justify-between'>
            <div className="relative w-[540px] h-[450px]">
              {fileType.startsWith('image') ? (
                <img src={previewData} alt="Preview" className="max-w-full max-h-full object-contain" />
              ) : fileType === 'application/pdf' ? (
                <iframe src={previewData} title="PDF Preview" className="w-full h-full" />
              ) : (
                <p>File preview not available.Please download and verify</p>
              )}
            </div>
              <div className='w-[211px]'>
                <div className='mb-4 mt-2'>
                  <h2 className='text-neutral-500 text-[15px] font-semibold leading-relaxed tracking-wide'>File information</h2>
                </div>
                <div className='mb-4'>
                  <h2 className='text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide'>FILE NAME</h2>
                  <h2 className='text-[14px] leading-relaxed tracking-wide'>{fileName}</h2>
                </div>
                <div className='mb-4'>
                  <h2 className='text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide'>FILE SIZE</h2>
                  <h2 className='text-[14px] leading-relaxed tracking-wide'>{(fileSize / 1024).toFixed(2)} KB</h2>
                </div>
                <div className='mb-4'>
                  <h2 className='text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide'>FILE TYPE</h2>
                  <h2 className='text-[14px] leading-relaxed tracking-wide'>{fileType}</h2>
                </div>
                <div className='mb-4'>
                  <h2 className='text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide'>UPLOAD DATE & TIME</h2>
                  <h2 className='text-[14px] leading-relaxed tracking-wide'>{uploadDateTime}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomFileUploadWidget;
