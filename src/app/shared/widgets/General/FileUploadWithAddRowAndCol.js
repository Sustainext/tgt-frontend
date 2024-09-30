import React, { useState, useEffect, useCallback } from 'react';
import { MdInfoOutline, MdOutlineFileUpload, MdFilePresent, MdAdd, MdOutlineDeleteOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { BlobServiceClient } from "@azure/storage-blob";
import { debounce } from 'lodash';

const FileUploadWithAddRowAndCol = (props) => {
  const { onChange, value = { MembershipAssociations: [[]], fileName: '', fileUrl: '' }, uiSchema = {} } = props;
  const [fileInfo, setFileInfo] = useState({ fileName: value.fileName || "", fileUrl: value.fileUrl || "" });
  const [localMembershipAssociations, setLocalMembershipAssociations] = useState(value.MembershipAssociations);

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
    setFileInfo({ fileName: value.fileName || "", fileUrl: value.fileUrl || "" });

    console.log('Initialized localMembershipAssociations:', value.MembershipAssociations);
  }, [value, onChange]);

  const debouncedOnChange = useCallback(
    debounce((updatedMembershipAssociations) => {
      console.log('Debounced onChange:', updatedMembershipAssociations);
      onChange({ ...value, MembershipAssociations: updatedMembershipAssociations });
    }, 300),
    [value, onChange]
  );

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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = await uploadFileToAzure(file);
      if (fileUrl) {
        const newFileInfo = { fileName: file.name, fileUrl };
        setFileInfo(newFileInfo);
        onChange({ ...value, ...newFileInfo });
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
              <label htmlFor={`fileInput-${uiSchema["ui:title"]}`} className="flex cursor-pointer">
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
                  <div className="truncate text-[#007EEF] text-sm ml-1">
                    Upload documentation
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
