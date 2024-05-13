'use client'
import { useState, useEffect } from 'react';
import { MdOutlineFileUpload, MdFilePresent, MdClose, MdDelete } from "react-icons/md";

const CustomFileUploadWidget = ({ id, onChange, formDataObject, setFormDataObject }) => {
  const [fileName, setFileName] = useState();
  const [showModal, setShowModal] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [fileType, setFileType] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [uploadDateTime, setUploadDateTime] = useState('');

  // Update formDataObject with fileName when a file is uploaded
  useEffect(() => {
    if (fileName !== null && formDataObject) {
      const updatedFormData = { ...formDataObject, FileName: fileName };
      setFormDataObject(updatedFormData);
    }
  }, [fileName, formDataObject, setFormDataObject]);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];

    setFileName(selectedFile ? selectedFile.name : null);
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        const base64String = reader.result;

        onChange(base64String);
        setPreviewData(reader.result);
        setFileType(selectedFile.type);
        setFileSize(selectedFile.size);
        setUploadDateTime(new Date().toLocaleString());
      };
    }
  };

  const handlePreview = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    setFileName(null);
    setPreviewData(null);
    onChange(null); // Clear the selected file
    setShowModal(false); // Close the modal after deletion
  };

  return (
    <div className="w-[120px] flex justify-center items-center mx-2">
      <input
        type="file"
        id={id}
        onChange={handleChange}
        style={{ display: 'none' }}
      />

      {fileName ? (
        <label className="flex cursor-pointer ">
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
        <label htmlFor={id} className="flex cursor-pointer ">
          <div
            className="flex items-center mt-2"
          >
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
            <div className="flex justify-between  mt-4 mb-4">
              <div>
                <h5 className="mb-4 ml-2 font-semibold">{fileName}</h5>
              </div>
              <div className='flex'>
              <div>
                  <button className="mt-1 px-2 py-1 mr-2 w-[150px] flex items-center justify-center border border-red-500 text-red-600 text-[13px] rounded hover:bg-red-600 hover:text-white" onClick={handleDelete}>
                    <MdDelete className="text-xl" /> Delete File
                  </button>
                </div>
                <div>
                <button className="px-4 py-2 text-xl rounded " onClick={handleCloseModal}><MdClose /></button>
                </div>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className="relative w-[540px] h-[450px]">
                {fileType.startsWith('image') ? (
                  <img src={previewData} alt="Preview" className="max-w-md max-h-md" />
                ) : fileType === 'application/pdf' ? (
                  <iframe src={previewData} title="PDF Preview" className="w-full h-full" />
                ) : (
                  <p>File preview not available.</p>
                )}
              </div>
              <div className='w-[211px]'>
                <div className='mb-4 mt-2'>
                  <h2 className='text-neutral-500 text-[15px] font-semibold  leading-relaxed tracking-wide'>File information</h2>
                </div>
                <div className='mb-4'>
                  <h2 className='text-neutral-500 text-[12px] font-semibold  leading-relaxed tracking-wide'>FILE NAME</h2>
                  <h2 className='text-[14px]  leading-relaxed tracking-wide'>{fileName}</h2>
                </div>
                <div className='mb-4'>
                  <h2 className='text-neutral-500 text-[12px] font-semibold  leading-relaxed tracking-wide'>FILE SIZE</h2>
                  <h2 className='text-[14px]  leading-relaxed tracking-wide'>{(fileSize / 1024).toFixed(2)} KB</h2>
                </div>
                <div className='mb-4'>
                  <h2 className='text-neutral-500 text-[12px] font-semibold  leading-relaxed tracking-wide'>FILE TYPE</h2>
                  <h2 className='text-[14px]  leading-relaxed tracking-wide'>{fileType}</h2>
                </div>
                <div className='mb-4'>
                  <h2 className='text-neutral-500 text-[12px] font-semibold  leading-relaxed tracking-wide'>UPLOAD DATE & TIME</h2>
                  <h2 className='text-[14px]  leading-relaxed tracking-wide'>{uploadDateTime}</h2>
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


