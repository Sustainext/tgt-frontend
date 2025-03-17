"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  MdOutlineFileUpload,
  MdFilePresent,
  MdClose,
  MdDelete,
} from "react-icons/md";
import { BlobServiceClient } from "@azure/storage-blob";
import axiosInstance from "@/app/utils/axiosMiddleware";
const CustomFileUploadWidget = ({
  id,
  onChange,
  value = {},
  scopes,
  setFormData,
  label,
  // locationname,
  // year,
  // monthname,
  // sectionname,
  tabname,
}) => {
  const text1 = useSelector((state) => state.header.headertext1);
  const text2 = useSelector((state) => state.header.headertext2);
  const middlename = useSelector((state) => state.header.middlename);
  const [fileName, setFileName] = useState(value?.name || null);
  const [logfileName, setLogFileName] = useState(value?.name || null);
  const [showModal, setShowModal] = useState(false);
  const [previewData, setPreviewData] = useState(value?.url || null);
  const [fileType, setFileType] = useState(value?.type || "");
  const [fileSize, setFileSize] = useState(value?.size || "");
  const [loginstatus, setLoginstatus] = useState("");
  const [eventdetils, setEvantdetis] = useState("");
  const useremail =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : "";
  const roles =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("textcustomrole")) || ""
      : "";
  const [uploadDateTime, setUploadDateTime] = useState(
    value?.uploadDateTime || ""
  );
  const locationname = useSelector((state) => state.FileInfoSlice.locationname);
  const year = useSelector((state) => state.FileInfoSlice.year);
  const monthname = useSelector((state) => state.FileInfoSlice.monthname);
  const sectionname = useSelector((state) => state.FileInfoSlice.sectionname);

  const uploadFileToAzure = async (file, newFileName) => {
    // Read file content as ArrayBuffer
    console.log(file, " is the file object");
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
    const blobName = newFileName || file.name;
    const blobClient = containerClient.getBlockBlobClient(blobName);

    try {
      // Upload the blob to Azure Blob Storage
      const uploadOptions = {
        blobHTTPHeaders: {
          blobContentType: file.type,
        },
      };

      await blobClient.uploadData(blob, uploadOptions);

      const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

      return url;
    } catch (error) {
      LoginlogDetails("Failed", "Uploaded");
      console.error("Error uploading file:", error.message);
      return null;
    }
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

  const LoginlogDetails = async (status, actionType, newFileName, fileType) => {
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
        logs: `${text1} > ${middlename} > ${text2} > ${locationname} > ${year} > ${monthname} > ${sectionname} > ${tabname} > ${newFileName} > ${fileType}`,
      };

      const response = await axiosInstance.post(userDetailsUrl, data);

      return response.data;
    } catch (error) {
      console.error("Error logging login details:", error);
      return null;
    }
  };

  useEffect(() => {
    console.log(value, " is the new value");

    if (value?.url && value?.name) {
      setFileName(value.name);
      setPreviewData(value.url);
      setFileType(value.type || "");
      setFileSize(value.size || "");
      setUploadDateTime(value.uploadDateTime || "");
    }
  }, [value]);

  const handleChange = async (event) => {
    console.log("handle change called");
    const selectedFile = event.target.files[0];

    const newFileName = selectedFile ? selectedFile.name : null;
    console.log(selectedFile, " is the selectedFile");
    setFileName(newFileName);
    setLogFileName(newFileName);

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onloadend = () => {
        const base64String = reader.result;
        console.log(reader, " is the reader object");

        const uploadAndSetState = async () => {
          const url = await uploadFileToAzure(selectedFile, newFileName);

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
        setTimeout(() => {
          LoginlogDetails(
            "Success",
            "Uploaded",
            newFileName,
            selectedFile.type
          );
        }, 1000);
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
    try {
      const resetValue = {
        name: "",
        url: "",
        type: "",
        size: "",
        uploadDateTime: "",
      };

      setFileName(null);
      setPreviewData(null);
      onChange(resetValue);
      setShowModal(false);

      // Call LoginlogDetails with a "Success" status for deletion
      setTimeout(() => {
        LoginlogDetails("Success", "Deleted", logfileName);
      }, 500);
    } catch (error) {
      console.error("Error deleting file:", error.message);
      // Call LoginlogDetails with a "Failed" status for deletion
      setTimeout(() => {
        LoginlogDetails("Failed", "Deleted");
      }, 500);
    }
  };

  return (
    <>
      <div className={id.startsWith("root_0") ? "mb-[3.2rem]" : "mb-[0.8rem]"}>
        <p className="text-[14px] text-neutral-950 font-[400] mb-1 hidden">
          {label}
        </p>
      </div>
      <div className="flex justify-center items-center ml-2  w-[80px]">
        <input
          type="file"
          id={id + scopes}
          onChange={handleChange}
          style={{ display: "none" }}
        />

        {fileName ? (
          <label className="flex cursor-pointer ml-1">
            <div className="flex items-center px-2" onClick={handlePreview}>
              <MdFilePresent className="w-5 h-5 mr-1 text-green-500" />
              <div className="w-[60px] truncate text-sky-600 text-[12px]">
                {fileName}
              </div>
            </div>
          </label>
        ) : (
          <label htmlFor={id + scopes} className="flex cursor-pointer ml-1">
            <div className="flex items-center  ">
              <MdOutlineFileUpload className="w-5 h-5 mr-1 text-[#007EEF]" />
              <div className="w-[60px] truncate text-[#007EEF] text-[12px] 4k:text-[14px] ml-1">
                Upload
              </div>
            </div>
          </label>
        )}

        {/* Preview Modal */}
        {showModal && previewData && (
           <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-1 rounded-lg w-[86%] h-[90%] mt-6 xl:w-[60%] lg:w-[60%] md:w-[60%] 2xl:w-[60%] 4k:w-[60%] 2k:w-[60%]">
              <div className="flex justify-between mt-4 mb-4">
                <div>
                  <h5 className="mb-4 ml-2 font-semibold">{fileName}</h5>
                </div>
                <div className="flex">
                  <div className="mb-4">
                    <button
                      className="px-2 py-1 mr-2 w-[150px] flex items-center justify-center border border-red-500 text-red-600 text-[13px] rounded hover:bg-red-600 hover:text-white"
                      onClick={() => handleDelete(id, scopes)}
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
              <div className="block justify-between xl:flex lg:flex d:flex  2xl:flex  4k:flex  2k:flex ">
              <div className="relative w-[105vw] xl:w-[55vw] lg:w-[55vw] 2xl:w-[55vw] 4k:w-[55vw] 2k:w-[55vw] h-[115vw] xl:h-[45vw] lg:h-[45vw] 2xl:h-[45vw] 4k:h-[45vw] 2k:h-[45vw]">
                  {fileType.startsWith("image") ? (
                    <img
                      src={previewData}
                      alt="Preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : fileType === "application/pdf" ? (
                    <iframe
                      src={previewData}
                      title="PDF Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <p>
                        File preview not available.Please download and verify
                      </p>
                      <a
                        href={previewData}
                        download={fileName}
                        className="mt-12 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Download File
                      </a>
                    </div>
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
                    <h2 className="text-[14px] leading-relaxed tracking-wide break-words">
                      {fileName}
                    </h2>
                  </div>
                  <div className="mb-4">
                    <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                      FILE SIZE
                    </h2>
                    <h2 className="text-[14px] leading-relaxed tracking-wide">
                      {(fileSize / 1024).toFixed(2)} KB
                    </h2>
                  </div>
                  <div className="mb-4">
                    <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                      FILE TYPE
                    </h2>
                    <h2 className="text-[14px] leading-relaxed tracking-wide break-words">
                      {fileType}
                    </h2>
                  </div>
                  <div className="mb-4">
                    <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                      UPLOAD DATE & TIME
                    </h2>
                    <h2 className="text-[14px] leading-relaxed tracking-wide">
                      {uploadDateTime}
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

export default CustomFileUploadWidget;
