import React, { useState, useEffect, useCallback } from 'react';
import { MdInfoOutline, MdOutlineFileUpload, MdFilePresent, MdAdd, MdOutlineDeleteOutline,  MdDelete,
  MdClose, } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { BlobServiceClient } from "@azure/storage-blob";
import { debounce } from 'lodash';
import { useSelector } from "react-redux";
import axiosInstance from "@/app/utils/axiosMiddleware";
const FileUploadWithAddRowAndCol = (props) => {
  const { onChange, value = { MembershipAssociations: [[]], fileName: '', fileUrl: '' }, uiSchema = {} } = props;
  const [fileInfo, setFileInfo] = useState({ fileName: value.fileName || "", fileUrl: value.fileUrl || "",fileType:value.fileType || "",fileSize:value.fileSize || "",uploadDateTime:value.uploadDateTime || ""  });
  const [localMembershipAssociations, setLocalMembershipAssociations] = useState(value.MembershipAssociations);
      const text1 = useSelector((state) => state.header.headertext1);
        const text2 = useSelector((state) => state.header.headertext2);
        const middlename = useSelector((state) => state.header.middlename);
        const useremail = typeof window !== 'undefined' ? localStorage.getItem("userEmail") : '';
        const roles = typeof window !== 'undefined' 
        ? JSON.parse(localStorage.getItem("textcustomrole")) || '' 
        : '';
          const [showModal, setShowModal] = useState(false);
  // Ensure there is always at least one row with one column in MembershipAssociations
  useEffect(() => {
    if (
      !Array.isArray(value.MembershipAssociations) ||
      value.MembershipAssociations.length === 0 ||
      (value.MembershipAssociations.length === 1 && value.MembershipAssociations[0].length === 0)
    ) {
      const initialData = [[""]];
      setLocalMembershipAssociations(initialData);
      onChange({ ...value, MembershipAssociations: initialData });
    } else {
      setLocalMembershipAssociations(value.MembershipAssociations);
    }

    // Update file info if it changes in props
    setFileInfo({ fileName: value.fileName || "", fileUrl: value.fileUrl || "",fileType:value.fileType || "",fileSize:value.fileSize || "",uploadDateTime:value.uploadDateTime || ""  });

    console.log('Initialized localMembershipAssociations:', value.MembershipAssociations);
  }, [value, onChange]);

  const debouncedOnChange = useCallback(
    debounce((updatedMembershipAssociations) => {
      console.log('Debounced onChange:', updatedMembershipAssociations);
      onChange({ ...value, MembershipAssociations: updatedMembershipAssociations });
    }, 300),
    [value, onChange]
  );
  const handlePreview = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleTextChange = (rowIndex, colIndex, event) => {
    const updatedMembershipAssociations = [...localMembershipAssociations];
    updatedMembershipAssociations[rowIndex][colIndex] = event.target.value;
    setLocalMembershipAssociations(updatedMembershipAssociations);
    debouncedOnChange(updatedMembershipAssociations);
  };

  const addRow = () => {
    const newMembershipAssociations = [...localMembershipAssociations, localMembershipAssociations[0].map(() => "")];
    setLocalMembershipAssociations(newMembershipAssociations);
    onChange({ ...value, MembershipAssociations: newMembershipAssociations });
  };

  const addColumn = () => {
    const newMembershipAssociations = localMembershipAssociations.map(row => [...row, ""]);
    setLocalMembershipAssociations(newMembershipAssociations);
    onChange({ ...value, MembershipAssociations: newMembershipAssociations });
  };

  const deleteRow = (rowIndex) => {
    const newMembershipAssociations = [...localMembershipAssociations];
    newMembershipAssociations.splice(rowIndex, 1);
    setLocalMembershipAssociations(newMembershipAssociations);
    onChange({ ...value, MembershipAssociations: newMembershipAssociations });
  };
  const getIPAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error fetching IP address:", error);
      return null;
    }
  };


  const LoginlogDetails = async (status, actionType) => {
    const backendUrl = process.env.BACKEND_API_URL;
    const userDetailsUrl = `${backendUrl}/sustainapp/post_logs/`;
  
    try {
      const ipAddress = await getIPAddress();
  
      
      const data = {
        event_type: text1,
        event_details: "File",
        action_type: actionType,
        status: status,
        user_email:useremail,
        user_role:roles,
        ip_address: ipAddress,
        logs: `${text1} > ${middlename} > ${text2}`,
      };
  
      const response = await axiosInstance.post(userDetailsUrl, data);
  
      return response.data;
    } catch (error) {
      console.error("Error logging login details:", error);
 
      return null;
    }
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = await uploadFileToAzure(file);
      if (fileUrl) {
        const newFileInfo = { 
          fileName: file.name,fileUrl:fileUrl,fileType:file.type,fileSize:file.size,uploadDateTime:new Date().toLocaleString()
         
        };
        setFileInfo(newFileInfo);
        onChange({ ...value, ...newFileInfo });
        setTimeout(() => {
          LoginlogDetails("Success", "Uploaded");
        }, 500);
      }
    }
  };

  const uploadFileToAzure = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer]);

    const accountName = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT;
    const containerName = process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER;
    const sasToken = process.env.NEXT_PUBLIC_AZURE_SAS_TOKEN;

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${sasToken}`
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = file.name;
    const blobClient = containerClient.getBlockBlobClient(blobName);

    try {
      await blobClient.uploadData(blob, {
        blobHTTPHeaders: {
          blobContentType: file.type,
        },
      });
      return `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
    } catch (error) {
      console.error("Error uploading file:", error.message);
      return null;
    }
  };
  const handleDelete = () => {
    try {
     
      const newFileInfo = { 
        fileName:"",fileUrl:"",fileType:"",fileSize:"",uploadDateTime:""
       
      };
      setFileInfo(newFileInfo);
      onChange({ ...value, ...newFileInfo });

      const fileInput = document.getElementById("fileInput");
      if (fileInput) fileInput.value = "";

      setShowModal(false);

      setTimeout(() => {
        LoginlogDetails("Success", "Deleted");
      }, 500);
    } catch (error) {
      console.error("Error deleting file:", error.message);

      setTimeout(() => {
        LoginlogDetails("Failed", "Deleted");
      }, 500);
    }
  };
  return (
    <>
      <div className="mb-6">
        <div className="flex mb-2">
          {/* <div className="relative w-full">
            <p className="text-sm text-gray-700 flex">
              {uiSchema["ui:title"]}
              <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
                data-tooltip-html={uiSchema["ui:tooltip"]}
                className="mt-1 ml-2 w-[30px] text-[14px]"
                style={{ display: uiSchema["ui:tooltipdisplay"] }}
              />
              <ReactTooltip
                id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
                place="top"
                effect="solid"
                style={{
                  width: "300px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                }}
              />
            </p>
          </div> */}
        </div>

        {localMembershipAssociations.length > 0 && localMembershipAssociations[0].length > 0 && (
          localMembershipAssociations.map((row, rowIndex) => (
            <div key={rowIndex} className="mb-2">
              <div className="flex">
                {row.map((col, colIndex) => (
                  <textarea
                    key={colIndex}
                    placeholder="Enter data"
                    className="border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mr-2"
                    value={col}
                    onChange={(event) => handleTextChange(rowIndex, colIndex, event)}
                    rows={2}
                  />
                ))}
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteRow(rowIndex)}
                >
                  <MdOutlineDeleteOutline size={24} />
                </button>
              </div>
            </div>
          ))
        )}

        <div className="flex gap-2 mt-2">
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 text-sm flex items-center"
            onClick={addRow}
          >
            <MdAdd className="mr-1" size={18} /> Add Row
          </button>
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 text-sm flex items-center"
            onClick={addColumn}
          >
            <MdAdd className="mr-1" size={18} /> Add Column
          </button>
        </div>

        <div className="mt-4">
          <div className="flex">
            <input
              type="file"
              id={`fileInput-${uiSchema["ui:title"]}`}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {fileInfo.fileName ? (
              <label  className="flex cursor-pointer"   >
                <div className="flex items-center text-center mt-2" onClick={handlePreview}>
                  <div className="truncate text-sky-600 text-sm flex text-center">
                    <MdFilePresent className="w-6 h-6 mr-1 text-green-500" /> {fileInfo.fileName}
                  </div>
                </div>
              </label>
            ) : (
              <label htmlFor={`fileInput-${uiSchema["ui:title"]}`} className="flex cursor-pointer ml-1">
                <div className="flex items-center mt-2">
                  <MdOutlineFileUpload className="w-6 h-6 mr-1 text-[#007EEF]" />
                  <div className="truncate text-[#007EEF] text-sm ml-1">
                    Upload documentation
                  </div>
                </div>
              </label>
            )}
          </div>
        </div>
           {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-1 rounded-lg w-[60%] h-[90%] mt-12">
                    <div className="flex justify-between mt-4 mb-4">
                      <div>
                        <h5 className="mb-4 ml-2 font-semibold">{fileInfo.fileName}</h5>
                      </div>
                      <div className="flex">
                        <div className="mb-4">
                          <button
                            className="px-2 py-1 mr-2 w-[150px] flex items-center justify-center border border-red-500 text-red-600 text-[13px] rounded hover:bg-red-600 hover:text-white"
                            onClick={handleDelete}
                          >
                            <MdDelete className="text-xl" /> Delete File
                          </button>
                        </div>
                        <div>
                          <button
                            className="px-4 py-2 text-xl rounded"
                            onClick={handleCloseModal}
                          >
                            <MdClose />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="relative w-[760px] h-[580px]">
                    
                        {fileInfo.fileType.startsWith("image") ? (
                          <img
                            src={fileInfo.fileUrl} 
                            alt="Preview"
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : fileInfo.fileType === "application/pdf" ? (
                          <iframe
                            src={fileInfo.fileUrl} 
                            title="PDF Preview"
                            className="w-full h-full"
                          />
                        ) : (
                          <p>File preview not available. Please download and verify.</p>
                        )}
                      </div>
                      <div className="w-[211px]">
                        <div className="mb-4 mt-2">
                          <h2 className="text-neutral-500 text-[15px] font-semibold leading-relaxed tracking-wide">
                            File information
                          </h2>
                        </div>
                        <div className="mb-4">
                          <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                            FILE NAME
                          </h2>
                          <h2 className="text-[14px] truncate leading-relaxed tracking-wide">
                            {fileInfo.fileName}
                          </h2>
                        </div>
                        <div className="mb-4">
                          <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                            FILE SIZE
                          </h2>
                          <h2 className="text-[14px] leading-relaxed tracking-wide">
                            {(fileInfo.fileSize / 1024).toFixed(2)} KB
                          </h2>
                        </div>
                        <div className="mb-4">
                          <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                            FILE TYPE
                          </h2>
                          <h2 className="text-[14px] leading-relaxed tracking-wide">
                            {fileInfo.fileType}
                          </h2>
                        </div>
                        <div className="mb-4">
                          <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                            UPLOAD DATE & TIME
                          </h2>
                          <h2 className="text-[14px] leading-relaxed tracking-wide">
                            {fileInfo.uploadDateTime}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
      </div>
    </>
  );
};

export default FileUploadWithAddRowAndCol;
