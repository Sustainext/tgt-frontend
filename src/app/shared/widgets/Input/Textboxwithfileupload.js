import React from 'react';
import { MdInfoOutline, MdOutlineFileUpload, MdFilePresent } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { BlobServiceClient } from "@azure/storage-blob";

const Textboxwithfileupload = (props) => {
  const { onChange, value = {}, uiSchema } = props;

  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange({ ...value, text: newValue });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const uploadedFileUrl = await uploadFileToAzure(file);
      onChange({ ...value, fileURL: uploadedFileUrl, fileName: file.name });
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

  return (
    <>
      <div className="mb-6">
        <div className="flex mb-2">
          <p className="text-sm text-gray-700 flex">
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
          className="border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
          value={value.text || ""}
          onChange={handleChange}
          rows={4}
        />
        <div className=''>
          <div className="flex right-1 mx-2">
            <input
              type="file"
              id={`fileInput-${uiSchema["ui:title"]}`} // Ensure unique id for each file input
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {value.fileName ? (
              <label className="flex cursor-pointer">
                <div className="flex items-center text-center mt-2 px-6">
                  <div className="truncate text-sky-600 text-sm flex text-center">
                    <MdFilePresent className="w-6 h-6 mr-1 text-green-500" /> {value.fileName}
                  </div>
                </div>
              </label>
            ) : (
              <label htmlFor={`fileInput-${uiSchema["ui:title"]}`} className="flex cursor-pointer ml-1">
                <div className="flex items-center mt-2">
                  <MdOutlineFileUpload className="w-6 h-6 mr-1 text-[#007EEF]" />
                  <div className="w-[150px] truncate text-[#007EEF] text-sm ml-1">
                    Upload Documentation
                  </div>
                </div>
              </label>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Textboxwithfileupload;
