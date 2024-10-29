import React, { useEffect, useState } from 'react';
import { MdInfoOutline, MdOutlineFileUpload, MdFilePresent } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { BlobServiceClient } from "@azure/storage-blob";

const InputWidget5 = (props) => {
  const { onChange, value = "", formContext, idSchema } = props;

  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange({ ...value, Q1: newValue });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploading file:", file.name);
      const uploadedFileUrl = await uploadFileToAzure(file);
      onChange({ ...value, fileURL: uploadedFileUrl, fileName: file.name });
    }
  };

  const uploadFileToAzure = async (file, newFileName) => {
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer]);

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
      const uploadOptions = {
        blobHTTPHeaders: {
          blobContentType: file.type,
        },
      };

      await blobClient.uploadData(blob, uploadOptions);
      const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
      return url;
    } catch (error) {
      console.error("Error uploading file:", error.message);
      return null;
    }
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex mb-2">
          <div className="relative">
            <p className="text-[14px] text-gray-700 font-[500] flex">
              {props.uiSchema["ui:title"]}
              <MdInfoOutline
                data-tooltip-id={`tooltip-${props.uiSchema["ui:title"].replace(/\s+/g, "-")}`}
                data-tooltip-content={props.uiSchema["ui:tooltip"]}
                className="mt-1 ml-2 w-[30px] text-[14px]"
                style={{ display: props.uiSchema["ui:tooltipdisplay"] }}
              />
              <ReactTooltip
                id={`tooltip-${props.uiSchema["ui:title"].replace(/\s+/g, "-")}`}
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
        </div>
        <textarea
          placeholder="Enter data"
          className="backdrop:before:w-[48rem] border appearance-none text-[12px] border-gray-400 text-neutral-600 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
          value={value.Q1 || ""}
          onChange={handleChange}
          rows={4}
        />
        <div className=''>
          <div className="flex right-1 mx-2">
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {value.fileName ? (
              <label className="flex cursor-pointer">
                <div
                  className="flex items-center text-center mt-2"
                >
                  <div className="truncate text-sky-600 text-[13px] flex text-center">
                    <MdFilePresent
                      className="w-6 h-6 mr-1 text-green-500"
                    /> 
                    <p className='flex items-center'>{value.fileName}</p>
                  </div>
                </div>
              </label>
            ) : (
              <label htmlFor="fileInput" className="flex cursor-pointer ml-1">
                <div className="flex items-center mt-2">
                  <MdOutlineFileUpload
                    className="w-6 h-6 mr-1 text-[#007EEF]"
                  />
                  <div className="w-[150px] truncate text-[#007EEF] text-[13px] ml-1">
                    Upload Documentation
                  </div>
                </div>
              </label>
            )}
          </div>
        </div>
        {/* {fileUrl && (
          <p className="mt-2 text-[12px] text-gray-500">
            File uploaded: <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a>
          </p>
        )} */}
      </div>
    </>
  );
};

export default InputWidget5;
