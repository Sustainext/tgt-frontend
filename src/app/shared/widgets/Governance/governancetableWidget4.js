import React, { useState, useCallback,useEffect } from "react";
import { debounce } from "lodash";
import { MdFilePresent, MdOutlineFileUpload, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { BlobServiceClient } from "@azure/storage-blob";

const GovernancetableWidget4 = ({ id, value = [], onChange, schema, uiSchema }) => {
    const [internalValue, setInternalValue] = useState(value);
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
            const fileName = file.name;

            const updatedValue = [...internalValue];
            if (!updatedValue[rowIndex]) {
                updatedValue[rowIndex] = {};
            }

            updatedValue[rowIndex].fileUrl = uploadedFileUrl;
            updatedValue[rowIndex].fileName = fileName;

            setInternalValue(updatedValue);
            debouncedOnChange(updatedValue);
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
            const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
            return url;
        } catch (error) {
            console.error("Error uploading file:", error.message);
            return null;
        }
    };

    return (
        <table className="rounded-md border border-gray-300  w-full" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
            <tbody>
                {uiSchema["ui:options"].rowLabels.map((label, rowIndex) => (
                    <tr key={rowIndex}>
                        <td className="border-t border-gray-300 p-3 text-left">
                            <div className="flex relative">
                                <span className="text-[12px]">{label.title}</span>
                                <MdInfoOutline
                                    data-tooltip-id={`tooltip-${label.title.replace(/\s+/g, '-')}`}
                                    data-tooltip-content={label.tooltip}
                                    className="ml-1 cursor-pointer mt-1 text-[12px]"
                                    style={{ display: label.display }}
                                />
                                <ReactTooltip
                                    id={`tooltip-${label.title.replace(/\s+/g, '-')}`}
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
                            </div>
                        </td>
                        <td className="border-t border-l border-gray-300 p-3 text-left">
                            <div>
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
                                            onChange={(e) => handleInputChange(e, "column1", rowIndex)}
                                            className="text-[12px] pl-2 py-2 w-full border-b"
                                        >
                                            <option value="">Select</option>
                                            {label.selectoption.map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        {internalValue[rowIndex]?.column1 === "Yes" && (
                                            <input
                                                type="text"
                                                placeholder="Enter details"
                                                value={internalValue[rowIndex]?.column1_details || ""}
                                                onChange={(e) => handleInputChange(e, "column1_details", rowIndex)}
                                                className="text-[12px] pl-2 py-2 mt-2 w-full border-b"
                                            />
                                        )}
                                    </>
                                )}
                            </div>
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
                                    <div className="flex items-center text-center mt-2 ">
                                        <div className=" text-sky-600 text-[12px] flex text-center w-[180px] truncate">

                                            <div className=" text-sky-600 text-[12px] flex justify-center"> 
                                                <MdFilePresent className="w-6 h-6 mr-1 text-green-500" />
                                                <p className='flex items-center'>{internalValue[rowIndex]?.fileName}</p>
                                                </div>
                                        </div>
                                    </div>
                                </label>
                            ) : (
                                <label htmlFor={`fileInput-${rowIndex}`} className="flex cursor-pointer">
                                    <div className="flex text-center mt-2 ">
                                        <MdOutlineFileUpload className="w-6 h-6 mr-1 text-[#007EEF]" />
                                        <div className=" truncate text-center text-[#007EEF] text-[13px] ml-1">
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
    );
};

export default GovernancetableWidget4;
