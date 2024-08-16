import React, { useState, useEffect, useRef } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import CustomTableWidget9 from "../../../../shared/widgets/Table/tableWidget9"
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline, MdOutlineFileUpload, MdFilePresent, MdDelete, MdClose } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
import { BlobServiceClient } from "@azure/storage-blob";
import axiosInstance from '@/app/utils/axiosMiddleware';

const widgets = {
  TableWidget: CustomTableWidget9,
};

const view_path = 'gri-social-training_hours-404-1a-number_of_hours';
const client_id = 1;
const user_id = 1;

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      category: { type: "integer", title: "Category" },
      male: { type: "integer", title: "Male" },
      female: { type: "integer", title: "Female" },
      others: { type: "integer", title: "Others" },
      male1: { type: "integer", title: "Male" },
      female2: { type: "integer", title: "Female" },
      others3: { type: "integer", title: "Others" },
      totalEmployees: { type: "integer", title: "Total number of Employee" },
      totalTrainingHours: { type: "integer", title: "Total number of Employee" },
      fileMetadata: {
        type: "object",
        properties: {
          fileUrl: { type: "string", title: "File URL" },
          fileName: { type: "string", title: "File Name" },
          fileType: { type: "string", title: "File Type" },
          fileSize: { type: "number", title: "File Size" },
          uploadDateTime: { type: "string", title: "Upload Date & Time" },
        }
      }
    }
  }
};

const uiSchema = {
  "ui:widget": "TableWidget",
  'ui:options': {
    titles: [
      { title: "Employee Category", tooltip: "Please specify the employee category. Employee category:breakdown of employees by level (such as senior management, middle management) and function (such as technical, administrative, production).", colSpan: 1 },
      { title: "Number of training hours provided to employees", tooltip: "Please specify the number of training hours provided to employees.", colSpan: 4 },
      { title: "Number of Employees", tooltip: "Specify the number of employee to which training has been provided. ", colSpan: 4 },
    ],
    tbtilte: [

      { title: "Gender", tooltip: "Please specify the training hours.", colSpan: 4 },
      { title: "Gender", tooltip: "Please specify the number of employees.", colSpan: 4 },
    ],
    subTitles: [
      { title: "", tooltip: "Please specify the category.", colSpan: 1, type: "text" },
      { title: "Male", tooltip: "Please specify the number of male individuals.", colSpan: 1, type: "number" },
      { title: "Female", tooltip: "Please specify the number of female individuals.", colSpan: 1, type: "number" },
      { title: "Others", tooltip: "Please specify the number of others individuals.", colSpan: 1, type: "number" },
      { title: "Total number of Employee", tooltip: "Please specify the total number of employees.", colSpan: 1, type: "number" },
      { title: "Male", tooltip: "Please specify the number of male individuals.", colSpan: 1, type: "number" },
      { title: "Female", tooltip: "Please specify the number of female individuals.", colSpan: 1, type: "number" },
      { title: "Others", tooltip: "Please specify the number of others individuals.", colSpan: 1, type: "number" },
      { title: "Total number of Employee", tooltip: "Please specify the total number of employees.", colSpan: 1, type: "number" },
    ]
  }
};

const bavkup = ({ selectedOrg, selectedCorp, location, year, month }) => {
  const initialFormData = [
    {
      category: "",
      male: "",
      female: "",
      others: "",
      totalEmployees: "",
      male1: "",
      female2: "",
      others3: "",
      totalTrainingHours: "",
      fileMetadata: {
        fileUrl: "",
        fileName: "",
        fileType: "",
        fileSize: "",
        uploadDateTime: ""
      }
    }
  ];

  const [formData, setFormData] = useState(initialFormData);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  const [fileName, setFileName] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [fileType, setFileType] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [uploadDateTime, setUploadDateTime] = useState("");
  const [file, setFile] = useState(null);

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const handleChange = (e) => {
    setFormData(e.formData);
  };

  const updateFormData = async () => {
    const data = {
      client_id: client_id,
      user_id: user_id,
      path: view_path,
      form_data: formData,
      corporate: selectedCorp,
      organisation: selectedOrg,
      year,
      month,
    };
    const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status === 200) {
        toast.success("Data added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        LoaderClose();
        loadFormData();
      } else {
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        LoaderClose();
      }
    } catch (error) {
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      LoaderClose();
    }
  };

  const loadFormData = async () => {
    LoaderOpen();
    setFormData(initialFormData);
    setFileName(null);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}&month=${month}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      setFormData(response.data.form_data[0].data);
      setFileName(response.data.form_data[0].data[0].fileMetadata.fileName);
      setFile(response.data.form_data[0].data[0].fileMetadata.fileUrl);
    } catch (error) {
      setFormData(initialFormData);
      setFileName(null);
    } finally {
      LoaderClose();
    }
  };

  // fetch backend and replace initialized forms
  useEffect(() => {
    if (selectedOrg && year && month) {
      loadFormData();
      toastShown.current = false; // Reset the flag when valid data is present
    } else {
      // Only show the toast if it has not been shown already
      if (!toastShown.current) {
        toastShown.current = true; // Set the flag to true after showing the toast
      }
    }
  }, [selectedOrg, year, month]);

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

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    const newFileName = selectedFile ? selectedFile.name : null;
    setFileName(newFileName);
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onloadend = () => {
        const base64String = reader.result;
        setPreviewData(base64String);
        setFileType(selectedFile.type);
        setFileSize(selectedFile.size);
        setUploadDateTime(new Date().toLocaleString());

        const updatedFormData = formData.map(item => ({
          ...item,
          fileMetadata: {
            fileUrl: "",
            fileName: newFileName,
            fileType: selectedFile.type,
            fileSize: selectedFile.size,
            uploadDateTime: new Date().toLocaleString()
          }
        }));

        setFormData(updatedFormData);
      };
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Show loader
    LoaderOpen();

    let uploadedFileUrl = "";

    // Handle file upload if a file is selected
    if (file) {
      uploadedFileUrl = await uploadFileToAzure(file, fileName);
      if (!uploadedFileUrl) {
        toast.error("File upload failed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        LoaderClose();
        return; // Exit if the file upload fails
      }

      const updatedFormData = formData.map(item => ({
        ...item,
        fileMetadata: {
          ...item.fileMetadata,
          fileUrl: uploadedFileUrl,
        }
      }));

      setFormData(updatedFormData);
      console.log(updatedFormData,"test all data update data ");
    }

    // Prepare data payload for the backend
    const data = {
      client_id: client_id,
      user_id: user_id,
      path: view_path,
      form_data: formData,
      corporate: selectedCorp,
      organisation: selectedOrg,
      year,
      month,
    };
    console.log(data,"test all data ");
    const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`;

    // Make API request to update backend data
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status === 200) {
        toast.success("Data added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        loadFormData();
      } else {
        throw new Error("Failed to update data");
      }
    } catch (error) {
      toast.error(`Oops, something went wrong: ${error.message}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      LoaderClose(); // Hide loader regardless of the outcome
    }
  };

  // Button click handler uses the form submission function
  const buttonClickHandler = (e) => handleFormSubmit(e);
  const handlePreview = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    setFileName(null);
    setPreviewData(null);
    setFileType("");
    setFileSize("");
    setUploadDateTime("");
    setFile(null);

    const updatedFormData = formData.map(item => ({
      ...item,
      fileMetadata: {
        fileUrl: "",
        fileName: "",
        fileType: "",
        fileSize: "",
        uploadDateTime: ""
      }
    }));

    setFormData(updatedFormData);
    setShowModal(false);
  };

  return (
    <>
      <div className="mx-2 p-3 mb-6 pb-6 rounded-md" style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
        <div className='mb-4 flex'>
         <div className="w-[80%] relative">
            <h2 className='flex mx-2 text-[17px] text-gray-500 font-semibold mb-2'>
              Number of  hours of training provided to employees
              <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                data-tooltip-content="This section documents the data corresponding to the average hours of training
                that the organization’s employees have undertaken during the reporting period,
                by gender and employee category." className="mt-1.5 ml-2 text-[14px]" />
              <ReactTooltip id={`tooltip-$e1`} place="top" effect="solid" style={{
                width: "290px", backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                textAlign: 'left',
              }}>
              </ReactTooltip>
            </h2>
          </div>
          <div className='w-[20%]'>
            <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
              <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                GRI 404-1a
              </p>
            </div>
          </div>
        </div>
        <div className='mx-2'>
          <Form
            schema={r_schema}
            uiSchema={r_ui_schema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}
            formContext={{
              onRemove: (index) => {
                const newFormData = formData.filter((_, i) => i !== index);
                setFormData(newFormData);
              }
            }}
          />
        </div>


        <div className='-mt-12 float-end'>
          {selectedOrg && year && (
            <div className="flex right-1 mx-2 ">
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {fileName ? (
                <label className="flex cursor-pointer">
                  <div
                    className="flex items-center text-center mt-2 px-6"
                  onClick={handlePreview}
                  >

                       <div className="truncate  text-sky-600 text-sm flex text-center ">
                       <MdFilePresent
                      className="w-6 h-6 mr-1 text-green-500"
                    /> {fileName}
                    </div>


                  </div>
                </label>
              ) : (
                <label htmlFor="fileInput" className="flex cursor-pointer ml-1">
                  <div className="flex items-center mt-2">
                    <MdOutlineFileUpload
                      className="w-6 h-6 mr-1 text-[#007EEF]"
                    />
                    <div className="w-[150px] truncate text-[#007EEF] text-sm ml-1">
                      Upload Documentation
                    </div>
                  </div>
                </label>
              )}
            </div>
          )}
        </div>

        <div className='mb-6'>
          <button type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${!selectedOrg || !year || !month ? "cursor-not-allowed" : ""}`}
            onClick={buttonClickHandler}
            disabled={!selectedOrg || !year || !month}
          >
            Submit
          </button>
        </div>
      </div>
      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval
            height={50}
            width={50}
            color="#00BFFF"
            secondaryColor="#f3f3f3"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
      {showModal && previewData && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-1 rounded-lg w-[60%] h-[90%] mt-12">
            <div className="flex justify-between mt-4 mb-4">
              <div>
                <h5 className="mb-4 ml-2 font-semibold">{fileName}</h5>
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
              <div className="relative w-[760px] h-[550px]">
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
                    className="w-full h-full"
                  />
                ) : (
                  <p>File preview not available. Please download and verify</p>
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
                  <h2 className="text-[14px] leading-relaxed tracking-wide">
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
                  <h2 className="text-[14px] leading-relaxed tracking-wide">
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
    </>
  );
};

export default bavkup;
