import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import {
  MdFilePresent,
  MdOutlineFileUpload,
  MdInfoOutline,
  MdDelete,
  MdClose,
} from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { BlobServiceClient } from "@azure/storage-blob";
import { useSelector } from "react-redux";
import axiosInstance from "@/app/utils/axiosMiddleware";

const GovernancetableWidget4 = ({
  id,
  value = [],
  onChange,
  schema,
  uiSchema,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [selectedFileDetails, setSelectedFileDetails] = useState(null); // Modal file details
  const [showModal, setShowModal] = useState(false);

  const text1 = useSelector((state) => state.header.headertext1);
  const text2 = useSelector((state) => state.header.headertext2);
  const middlename = useSelector((state) => state.header.middlename);
  const useremail =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : "";
  const roles =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("textcustomrole")) || ""
      : "";

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const debouncedOnChange = useCallback(
    debounce((updatedValue) => {
      onChange(updatedValue);
    }, 300),
    []
  );

  const handleInputChange = (event, key, rowIndex) => {
    const updatedValue = [...internalValue];
    if (!updatedValue[rowIndex]) {
      updatedValue[rowIndex] = {};
    }
    updatedValue[rowIndex][key] = event.target.value;
    setInternalValue(updatedValue);
    debouncedOnChange(updatedValue);
  };

  const handleFileChange = async (event, rowIndex) => {
    const file = event.target.files[0];
    if (file) {
      const uploadedFileUrl = await uploadFileToAzure(file);
      const fileDetails = {
        fileUrl: uploadedFileUrl,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        uploadDateTime: new Date().toLocaleString(),
      };

      const updatedValue = [...internalValue];
      if (!updatedValue[rowIndex]) {
        updatedValue[rowIndex] = {};
      }

      updatedValue[rowIndex] = { ...updatedValue[rowIndex], ...fileDetails };
      setInternalValue(updatedValue);
      debouncedOnChange(updatedValue);

      setTimeout(() => {
        LoginlogDetails("Success", "Uploaded");
      }, 500);
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
      const uploadOptions = {
        blobHTTPHeaders: {
          blobContentType: file.type,
        },
      };

      await blobClient.uploadData(blob, uploadOptions);
      return `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
    } catch (error) {
      LoginlogDetails("Failed", "Uploaded");
      console.error("Error uploading file:", error.message);
      return null;
    }
  };

  const handleDelete = (rowIndex) => {
    try {
      // Update the file details for the specific row
      const updatedValue = [...internalValue];
      if (updatedValue[rowIndex]) {
        updatedValue[rowIndex] = {
          ...updatedValue[rowIndex],
          fileUrl: "",
          fileName: "",
          fileType: "",
          fileSize: "",
          uploadDateTime: "",
        };
      }
  
      // Update the state
      setInternalValue(updatedValue);
      debouncedOnChange(updatedValue);
  
      // Close the modal and reset selected file details
      setSelectedFileDetails(null);
      setShowModal(false);
  
      // Log the deletion action
      setTimeout(() => {
        LoginlogDetails("Success", "Deleted");
      }, 500);
    } catch (error) {
      console.error("Error deleting file:", error.message);
  
      // Log the failed deletion action
      setTimeout(() => {
        LoginlogDetails("Failed", "Deleted");
      }, 500);
    }
  };
  

  const handlePreview = (rowIndex) => {
    setSelectedFileDetails(internalValue[rowIndex]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFileDetails(null);
  };

  return (
    <>
      <table
        className="rounded-md border border-gray-300 w-full"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <tbody>
          {uiSchema["ui:options"].rowLabels.map((label, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border-t border-gray-300 p-3 text-left">
                <div className="flex relative">
                  <span className="text-[12px]">{label.title}</span>
                  <MdInfoOutline
                    data-tooltip-id={`tooltip-${label.title.replace(
                      /\s+/g,
                      "-"
                    )}`}
                    data-tooltip-content={label.tooltip}
                    className="ml-1 cursor-pointer mt-1 text-[12px]"
                    style={{ display: label.display }}
                  />
                  <ReactTooltip
                    id={`tooltip-${label.title.replace(/\s+/g, "-")}`}
                    place="top"
                    effect="solid"
                  />
                </div>
              </td>
              <td className="border-t border-l border-gray-300 p-3 text-left">
                {label.type === "text" ? (
                  <input
                    type="text"
                    value={internalValue[rowIndex]?.column1 || ""}
                    onChange={(e) => handleInputChange(e, "column1", rowIndex)}
                    className="text-[12px] pl-2 py-2 w-full border-b"
                  />
                ) : (
                  <>
                    <select
                      value={internalValue[rowIndex]?.column1 || ""}
                      onChange={(e) =>
                        handleInputChange(e, "column1", rowIndex)
                      }
                      className="text-[12px] pl-2 py-2 w-full border-b"
                    >
                      <option value="">Select</option>
                      {label.selectoption.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </td>
              <td className="border-t border-l border-gray-300 p-3 text-left">
                <input
                  type="file"
                  id={`fileInput-${rowIndex}`}
                  onChange={(e) => handleFileChange(e, rowIndex)}
                  style={{ display: "none" }}
                />
                {internalValue[rowIndex]?.fileName ? (
                  <label className="flex cursor-pointer">
                    <div className="flex items-center text-center mt-2">
                      <div
                        className="text-sky-600 text-[12px] flex text-center w-[180px] truncate"
                        onClick={() => handlePreview(rowIndex)}
                      >
                        <MdFilePresent className="w-6 h-6 mr-1 text-green-500" />
                        <p className="flex items-center">
                          {internalValue[rowIndex]?.fileName}
                        </p>
                      </div>
                    </div>
                  </label>
                ) : (
                  <label
                    htmlFor={`fileInput-${rowIndex}`}
                    className="flex cursor-pointer"
                  >
                    <div className="flex text-center mt-2">
                      <MdOutlineFileUpload className="w-6 h-6 mr-1 text-[#007EEF]" />
                      <div className="truncate text-center text-[#007EEF] text-[13px] ml-1">
                        Upload Documentation
                      </div>
                    </div>
                  </label>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedFileDetails && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-1 rounded-lg w-[60%] h-[90%] mt-12">
            <div className="flex justify-between mt-4 mb-4">
              <div>
                <h5 className="mb-4 ml-2 font-semibold">
                  {selectedFileDetails.fileName}
                </h5>
              </div>
              <div className="flex">
                <div className="mb-4">
                  <button
                    className="px-2 py-1 mr-2 w-[150px] flex items-center justify-center border border-red-500 text-red-600 text-[13px] rounded hover:bg-red-600 hover:text-white"
                    onClick={() => handleDelete(internalValue.findIndex(item => item === selectedFileDetails))}
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
                {selectedFileDetails.fileType?.startsWith("image") ? (
                  <img
                    src={selectedFileDetails.fileUrl}
                    alt="File Preview"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : selectedFileDetails.fileType === "application/pdf" ? (
                  <iframe
                    src={selectedFileDetails.fileUrl}
                    title="PDF Preview"
                    className="w-full h-96"
                  />
                ) : (
                  <p>Preview not available. Please download the file.</p>
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
                    {selectedFileDetails.fileName}
                  </h2>
                </div>
                <div className="mb-4">
                  <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                    FILE SIZE
                  </h2>
                  <h2 className="text-[14px] leading-relaxed tracking-wide">
                    {(selectedFileDetails.fileSize / 1024).toFixed(2)} KB
                  </h2>
                </div>
                <div className="mb-4">
                  <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                    FILE TYPE
                  </h2>
                  <h2 className="text-[14px] leading-relaxed tracking-wide">
                    {selectedFileDetails.fileType}
                  </h2>
                </div>
                <div className="mb-4">
                  <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                    UPLOAD DATE & TIME
                  </h2>
                  <h2 className="text-[14px] leading-relaxed tracking-wide">
                    {selectedFileDetails.uploadDateTime}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GovernancetableWidget4;
