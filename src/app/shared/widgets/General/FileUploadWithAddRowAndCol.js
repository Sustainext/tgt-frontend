import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdInfoOutline, MdAdd, MdDelete, MdOutlineFileUpload, MdFilePresent } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { BlobServiceClient } from "@azure/storage-blob";

const FileUploadWithAddRowAndCol = ({ onChange, value = [], uiSchema = {} }) => {
  const [data, setData] = useState([[""]]);
  const [fileInfo, setFileInfo] = useState({});

  useEffect(() => {
    if (value.length > 0) {
      setData(value.slice(0, -1));
      setFileInfo(value[value.length - 1]);
    }
  }, [value]);

  useEffect(() => {
    if (data.length === 0) {
      setData([[""]]);
    } else {
      onChange([...data, fileInfo]);
    }
  }, [data, fileInfo, onChange]);

  const handleCellChange = (rowIndex, colIndex, event) => {
    const newData = data.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? event.target.value : cell
      )
    );
    setData(newData);
  };

  const addRow = () => {
    const newRow = new Array(data[0]?.length || 1).fill("");
    setData([...data, newRow]);
  };

  const addColumn = () => {
    setData(data.map((row) => [...row, ""]));
  };

  const deleteRow = (rowIndex) => {
    setData(data.filter((_, index) => index !== rowIndex));
  };

  const deleteColumn = (colIndex) => {
    setData(data.map((row) => row.filter((_, index) => index !== colIndex)));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const uploadedFileUrl = await uploadFileToAzure(file);
      setFileInfo({ fileURL: uploadedFileUrl, fileName: file.name });
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
          <div className="relative">
            <p className="text-sm text-gray-700 flex">
              {uiSchema["ui:title"]}
              <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
                data-tooltip-content={uiSchema["ui:tooltip"]}
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
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-2">
              {row.map((cell, colIndex) => (
                <textarea
                  key={colIndex}
                  placeholder="Enter data"
                  className="border appearance-none text-xs py-4 border-gray-400 text-neutral-600 pl-2 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
                  value={cell}
                  onChange={(e) => handleCellChange(rowIndex, colIndex, e)}
                  rows={1}
                />
              ))}
              {data.length > 1 && (
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteRow(rowIndex)}
                >
                  <MdDelete />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
            onClick={addRow}
          >
            <MdAdd /> Add Row
          </button>
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
            onClick={addColumn}
          >
            <MdAdd /> Add Column
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
              <label className="flex cursor-pointer">
                <div className="flex items-center text-center mt-2">
                  <div className="truncate text-sky-600 text-sm flex text-center">
                    <MdFilePresent className="w-6 h-6 mr-1 text-green-500" /> {fileInfo.fileName}
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

export default FileUploadWithAddRowAndCol;
