import React, { useEffect, useState } from "react";
import {
  MdInfoOutline,
  MdOutlineFileUpload,
  MdFilePresent,
  MdDelete,
  MdClose,
} from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { BlobServiceClient } from "@azure/storage-blob";
import { useSelector } from "react-redux";
import axiosInstance from "@/app/utils/axiosMiddleware";
const Textboxwithfileupload = (props) => {
  const { onChange, value = {}, uiSchema } = props;
  const [showModal, setShowModal] = useState(false);
  const [fileType, setFileType] = useState(value.filetype || "");
  const [fileSize, setFileSize] = useState(value.filesize || "");
  const [uploadDateTime, setUploadDateTime] = useState(value.updatetime || "");
  const [fileURL, setFileURL] = useState(value.fileURL || "");
  const [fileName, setFileName] = useState(value.fileName || "");
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
    if (value && Object.keys(value).length > 0) {
      setFileType(value.filetype || "");
      setFileSize(value.filesize || "");
      setUploadDateTime(value.updatetime || "");
      setFileURL(value.fileURL || "");
      setFileName(value.fileName || "");
    } else {
      setFileType("");
      setFileSize("");
      setUploadDateTime("");
      setFileURL("");
      setFileName("");
    }
  }, [value]);
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
  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange({ ...value, text: newValue });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return; // Exit if no file selected

    // Reset the input value to allow reselecting the same file
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";

    console.log("Uploading file: new", file);
    const uploadedFileUrl = await uploadFileToAzure(file);

    if (uploadedFileUrl) {
      console.log(
        "Uploaded file:",
        uploadedFileUrl,
        file.name,
        file.type,
        file.size,
        new Date().toLocaleString()
      );
      onChange({
        ...value,
        fileURL: uploadedFileUrl,
        fileName: file.name,
        filetype: file.type,
        filesize: file.size,
        updatetime: new Date().toLocaleString(),
      });

      setFileType(file.type);
      setFileSize(file.size);
      setUploadDateTime(new Date().toLocaleString());
      setFileURL(uploadedFileUrl);
      setFileName(file.name);

      setTimeout(() => {
        LoginlogDetails("Success", "Uploaded");
      }, 500);
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
      LoginlogDetails("Failed", "Uploaded");
      console.error("Error uploading file:", error.message);
      return null;
    }
  };
  const handleDelete = () => {
    try {
      setFileType("");
      setFileSize("");
      setUploadDateTime("");
      setFileURL("");
      setFileName("");
      onChange({
        ...value,
        fileURL: "",
        fileName: "",
        filetype: "",
        filesize: "",
        updatetime: "",
      });

      // Reset the file input element
      const fileInput = document.getElementById("fileInput");
      if (fileInput) fileInput.value = "";

      setShowModal(false);

      // Call LoginlogDetails with a "Success" status for deletion
      setTimeout(() => {
        LoginlogDetails("Success", "Deleted");
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
      <div className="mb-6">
        <div className="flex relative">
          <h2
            className="mb-2 text-[14px] text-gray-700 font-[500] flex"
            style={{ display: uiSchema["ui:hadingdisplay"] }}
          >
            {uiSchema["ui:hading"]}
          </h2>
          <p>
            <MdInfoOutline
              data-tooltip-id={`tooltip-${uiSchema["ui:hading"].replace(
                /\s+/g,
                "-"
              )}`}
              data-tooltip-html={uiSchema["ui:hadingtooltip"]}
              className="mt-1 ml-2 w-[30px] text-[14px]"
              style={{ display: uiSchema["ui:hadingtooltipdisplay"] }}
            />
            {/* Tooltip */}
            <ReactTooltip
              id={`tooltip-${uiSchema["ui:hading"].replace(/\s+/g, "-")}`}
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
            ></ReactTooltip>
          </p>
        </div>

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
        <textarea
          placeholder="Enter data"
          className="border appearance-none text-[12px] border-gray-400 text-neutral-600 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
          value={value.text || ""}
          onChange={handleChange}
          rows={4}
        />
        <div className="">
          <div className="flex right-1">
            <input
              type="file"
              id={`fileInput-${uiSchema["ui:title"]}`} // Ensure unique id for each file input
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {value.fileName ? (
              <label className="flex cursor-pointer">
                <div
                  className="flex items-center text-center mt-2"
                  onClick={handlePreview}
                >
                  <div className="truncate text-sky-600 text-[13px] flex text-center">
                    <MdFilePresent className="w-6 h-6 mr-1 text-green-500" />
                    <p className="flex items-center">{value.fileName}</p>
                  </div>
                </div>
              </label>
            ) : (
              <label
                htmlFor={`fileInput-${uiSchema["ui:title"]}`}
                className="flex cursor-pointer ml-1"
              >
                <div className="flex items-center mt-2">
                  <MdOutlineFileUpload className="w-6 h-6 mr-1 text-[#007EEF]" />
                  <div className="w-[150px] truncate text-[#007EEF] text-[13px] ml-1">
                    Upload Documentation
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
                  <h5 className="mb-4 ml-2 font-semibold"> {fileName}</h5>
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
                  {fileName ? (
                    fileType.startsWith("image") ? (
                      <img
                        src={fileURL}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : fileType === "application/pdf" ? (
                      <iframe
                        src={fileURL}
                        title="PDF Preview"
                        className="w-full h-full"
                      />
                    ) : (
                      <p>
                        File preview not available. Please download and verify
                      </p>
                    )
                  ) : fileType.startsWith("image") ? (
                    <img
                      src={fileURL}
                      alt="Preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : fileType === "application/pdf" ? (
                    <iframe
                      src={fileURL}
                      title="PDF Preview"
                      className="w-full h-full"
                    />
                  ) : (
                    <p>
                      File preview not available. Please download and verify
                    </p>
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
                    <h2 className="text-[14px] leading-relaxed tracking-wide  break-words">
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

export default Textboxwithfileupload;
