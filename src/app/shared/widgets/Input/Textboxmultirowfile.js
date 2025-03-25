import React, { useState, useEffect } from "react";
import {
  MdInfoOutline,
  MdOutlineFileUpload,
  MdFilePresent,
  MdAdd,
  MdDelete,
  MdClose,
} from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { BlobServiceClient } from "@azure/storage-blob";
import { useSelector } from "react-redux";
import axiosInstance from "@/app/utils/axiosMiddleware";

const Textboxmultirowfile = (props) => {
  const { uiSchema, onChange, value = { rows: [{ text: "" }], file: {} } } = props;
  const [rows, setRows] = useState(value.rows || [{ text: "" }]);
  const [file, setFile] = useState(value.file || { fileURL: "", fileName: "",fileType:"",fileSize:"",uploadDateTime:"" });
  const [showModal, setShowModal] = useState(false);


  const text1 = useSelector((state) => state.header.headertext1);
  const text2 = useSelector((state) => state.header.headertext2);
  const middlename = useSelector((state) => state.header.middlename);
  const useremail = typeof window !== "undefined" ? localStorage.getItem("userEmail") : "";
  const roles = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("textcustomrole")) || ""
    : "";

  // Update rows and file when value changes
  useEffect(() => {
    setRows(value.rows || [{ text: "" }]);
    setFile(value.file || { fileURL: "", fileName: "",fileType:"",fileSize:"",uploadDateTime:""});
  }, [value]);



  const handleChange = (index, event) => {
    const newRows = [...rows];
    newRows[index].text = event.target.value;
    setRows(newRows);

    // Call onChange after updating rows
    onChange({ rows: newRows, file });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
  
    if (!file) return;
  
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
  
    const uploadedFileUrl = await uploadFileToAzure(file);
  
    if (uploadedFileUrl) {
      const updatedFile = {
        fileURL: uploadedFileUrl,
        fileName: file.name,
       fileType:file.type,
       fileSize:file.size,
       uploadDateTime:new Date().toLocaleString(),
      };
  
  
      // Call onChange with additional file details
      onChange({
        rows,
        file: updatedFile,
    
      });
  
      setTimeout(() => {
        LoginlogDetails("Success", "Uploaded");
      }, 500);
    }
  };
  

  const handleAddNew = () => {
    const newRows = [...rows, { text: "" }];
    setRows(newRows);

    // Call onChange after adding a new row
    onChange({ rows: newRows, file });
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

  const handlePreview = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
        user_email: useremail,
        user_role: roles,
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

  const handleDelete = () => {
    try {
     
      onChange({
        rows,
        file: { fileURL: "", fileName: "",fileType:"",fileSize:"",uploadDateTime:"" },
      });

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
    <div className="mb-6">
      <div className="flex mb-2 relative">
        <p className="text-[14px] text-gray-700 font-[500] flex">
          {uiSchema["ui:title"]}
          <MdInfoOutline
            data-tooltip-id={uiSchema["ui:tooltip"]}
            data-tooltip-content={uiSchema["ui:tooltip"]}
            className="mt-1 ml-2 w-[30px] text-[14px]"
            style={{ display: uiSchema["ui:tooltipdisplay"] }}
          />
          <ReactTooltip
            id={uiSchema["ui:tooltip"]}
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
      </div>
      {rows.map((row, index) => (
        <div key={index} className="mb-4">
          <textarea
            placeholder="Enter data"
            className="border appearance-none text-[12px] border-gray-400 text-neutral-600 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
            value={row.text}
            onChange={(event) => handleChange(index, event)}
            rows={4}
          />
        </div>
      ))}
      <button
        type="button"
        className="text-[#007EEF] text-[13px] flex cursor-pointer my-auto"
        onClick={handleAddNew}
      >
        Add Data <MdAdd className="text-lg" />
      </button>

      <div className="mt-4">
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {file.fileName ? (
          <label className="flex cursor-pointer">
            <div className="flex items-center text-center mt-2">
              <div
                className="truncate text-sky-600 text-[13px] flex text-center"
                onClick={handlePreview}
              >
                <MdFilePresent className="w-6 h-6 mr-1 text-green-500" />
                {file.fileName}
              </div>
            </div>
          </label>
        ) : (
          <label htmlFor="fileInput" className="flex cursor-pointer">
            <div className="flex items-center mt-2">
              <MdOutlineFileUpload className="w-6 h-6 mr-1 text-[#007EEF]" />
              <div className="w-[150px] truncate text-[#007EEF] text-[13px] ml-1">
                Upload Documentation
              </div>
            </div>
          </label>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-1 rounded-lg w-[60%] h-[90%] mt-12">
            <div className="flex justify-between mt-4 mb-4">
              <div>
                <h5 className="mb-4 ml-2 font-semibold">{file.fileName}</h5>
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
                {file.fileType.startsWith("image") ? (
                  <img
                    src={file.fileURL}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : file.fileType === "application/pdf" ? (
                  <iframe
                    src={file.fileURL}
                    title="PDF Preview"
                    className="w-full h-full"
                  />
                ) : <div className="flex flex-col items-center justify-center h-full">
                      <p>
                        File preview not available.Please download and verify
                      </p>
                      <a
                        href={file.fileURL}
                        download={file.fileName}
                        className="mt-12 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Download File
                      </a>
                    </div>}
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
                  <h2 className="text-[14px] leading-relaxed tracking-wide  break-words">
                    {file.fileName}
                  </h2>
                </div>
                <div className="mb-4">
                  <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                    FILE SIZE
                  </h2>
                  <h2 className="text-[14px] leading-relaxed tracking-wide">
                    {(file.fileSize / 1024).toFixed(2)} KB
                  </h2>
                </div>
                <div className="mb-4">
                  <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                    FILE TYPE
                  </h2>
                  <h2 className="text-[14px] leading-relaxed tracking-wide break-words">
                    {file.fileType}
                  </h2>
                </div>
                <div className="mb-4">
                  <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                    UPLOAD DATE & TIME
                  </h2>
                  <h2 className="text-[14px] leading-relaxed tracking-wide">
                    {file.uploadDateTime}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Textboxmultirowfile;
