import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import CustomTableWidget9 from "../../../../shared/widgets/Table/tableWidget9";
import {
  MdAdd,
  MdOutlineDeleteOutline,
  MdInfoOutline,
  MdOutlineFileUpload,
  MdFilePresent,
  MdDelete,
  MdClose,
} from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { BlobServiceClient } from "@azure/storage-blob";
import axiosInstance from "@/app/utils/axiosMiddleware";
import { useSelector } from "react-redux";
const widgets = {
  TableWidget: CustomTableWidget9,
};

const view_path = "gri-social-training_hours-404-1a-number_of_hours";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      category: { type: "string", title: "Category" },
      male: { type: "string", title: "Male" },
      female: { type: "string", title: "Female" },
      others: { type: "string", title: "Others" },
      male1: { type: "string", title: "Male" },
      female1: { type: "string", title: "Female" },
      others2: { type: "string", title: "Others" },
      totalEmployees: { type: "string", title: "Total number of Employee" },
      totalTrainingHours: { type: "string", title: "Total number of Employee" },
    },
  },
};

const uiSchema = {
  "ui:widget": "TableWidget",
  "ui:options": {
    titles: [
      {
        title: "Employee Category",
        tooltip:
          "Please specify the employee category. Employee category:breakdown of employees by level (such as senior management, middle management) and function (such as technical, administrative, production).",
        colSpan: 1,
      },
      {
        title: "Number of training hours provided to employees",
        tooltip:
          "Please specify the number of training hours provided to employees.",
        colSpan: 4,
      },
      {
        title: "Number of Employees",
        tooltip:
          "Specify the number of employee to which training has been provided. ",
        colSpan: 4,
      },
    ],
    tbtilte: [
      {
        title: "Gender",
        tooltip: "Please specify the training hours.",
        colSpan: 4,
      },
      {
        title: "Gender",
        tooltip: "Please specify the number of employees.",
        colSpan: 4,
      },
    ],
    subTitles: [
      {
        title: "",
        title2: "Category",
        tooltip: "Please specify the category.",
        colSpan: 1,
        type: "text",
      },
      {
        title: "Male",
        title2: "Male",
        tooltip: "Please specify the number of male individuals.",
        colSpan: 1,
        type: "number",
      },
      {
        title: "Female",
        title2: "Female",
        tooltip: "Please specify the number of female individuals.",
        colSpan: 1,
        type: "number",
      },
      {
        title: "Others",
        title2: "Others",
        tooltip: "Please specify the number of others individuals.",
        colSpan: 1,
        type: "number",
      },
      {
        title: "Total number of Employee",
        title2: "totalEmployees",
        tooltip: "Please specify the total number of employees.",
        colSpan: 1,
        type: "number",
      },
      {
        title: "Male",
        title2: "Male1",
        tooltip: "Please specify the number of male individuals.",
        colSpan: 1,
        type: "number",
      },
      {
        title: "Female",
        title2: "Female1",
        tooltip: "Please specify the number of female individuals.",
        colSpan: 1,
        type: "number",
      },
      {
        title: "Others",
        title2: "Others1",
        tooltip: "Please specify the number of others individuals.",
        colSpan: 1,
        type: "number",
      },
      {
        title: "Total number of Employee",
        title2: "totalTrainingHours",
        tooltip: "Please specify the total number of employees.",
        colSpan: 1,
        type: "number",
      },
    ],
  },
};

const Screen1 = ({
  selectedOrg,
  selectedCorp,
  location,
  year,
  month,
  togglestatus,
}) => {
  const initialFormData = [
    {
      category: "",
      male: "",
      female: "",
      others: "",
      totalTrainingHours: "",
      male1: "",
      female1: "",
      others1: "",
      totalEmployees: "",
    },
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
  const [newfile, setNewfile] = useState(null);
  const [fleg, setfleg] = useState(null);
  const text1 = useSelector((state) => state.header.headertext1);
  const text2 = useSelector((state) => state.header.headertext2);
  const middlename = useSelector((state) => state.header.middlename);
  const useremail =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : "";
  const roles =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("textcustomrole")) || ""
      : "";
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const handleChange = (e) => {
    setFormData(e.formData);
  };
  const handleRemoveCommittee = (index) => {
    const newFormData = formData.filter((_, i) => i !== index);
    setFormData(newFormData);
    if (index === 0) {
      // if the first row is removed
      setFile(null); // Reset or handle file object accordingly
    }
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
    // console.log('Response:', response.data);
    // } catch (error) {
    // console.error('Error:', error);
    // }
  };

  const loadFormData = async () => {
    LoaderOpen();
    setFormData(initialFormData);
    setFileName(null);
    setPreviewData(null);
    setFileType("");
    setFileSize("");
    setUploadDateTime("");
    setfleg("");
    setNewfile("");

    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}&month=${month}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      setFormData(response.data.form_data[0].data);
      setFileName(response.data.form_data[0].data[0].fileName);
      setFileType(response.data.form_data[0].data[0].fileType);
      setFileSize(response.data.form_data[0].data[0].fileSize);
      setUploadDateTime(response.data.form_data[0].data[0].uploadDateTime);
      setfleg(response.data.form_data[0].data[0].fileName);
      setNewfile(response.data.form_data[0].data[0].fileUrl);
    } catch (error) {
      setFormData(initialFormData);
      setFileName(null);
      setPreviewData(null);
      setFileType("");
      setFileSize("");
      setUploadDateTime("");
      setFile("");
      setNewfile("");
    } finally {
      LoaderClose();
    }
  };

  // fetch backend and replace initialized forms
  useEffect(() => {
    if (selectedOrg && year && month && togglestatus) {
      if (togglestatus === "Corporate" && selectedCorp) {
        loadFormData();
      } else if (togglestatus === "Corporate" && !selectedCorp) {
        setFormData(initialFormData);
        setRemoteSchema({});
        setRemoteUiSchema({});
      } else {
        loadFormData();
      }

      toastShown.current = false;
    } else {
      if (!toastShown.current) {
        toastShown.current = true;
      }
    }
  }, [selectedOrg, year, selectedCorp, togglestatus, month]);

  // const handleSubmit = (e) => {
  //   e.preventDefault(); // Prevent the default form submission
  //   console.log("Form data:", formData);
  //   updateFormData();
  // };

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
      };
      setTimeout(() => {
        LoginlogDetails("Success", "Uploaded");
      }, 500);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Show loader
    LoaderOpen();

    let uploadedFileUrl = newfile;

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
    }

    // Prepare updated form data including the file URL
    const updatedFormData = formData.map((item, index) => {
      if (index === 0) {
        // Check if it's the first item
        return {
          ...item,
          fileUrl: uploadedFileUrl, // Only the first item gets the new file URL
          fileName, // and other file properties
          fileType,
          fileSize,
          uploadDateTime,
        };
      } else {
        return item; // Other items remain unchanged
      }
    });
    // Update form data state
    setFormData(updatedFormData);

    // Prepare data payload for the backend
    const data = {
      client_id: client_id,
      user_id: user_id,
      path: view_path,
      form_data: updatedFormData, // This should be an array of objects
      corporate: selectedCorp,
      organisation: selectedOrg,
      year,
      month,
    };

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
    try {
      setFileName(null);
      setPreviewData(null);
      setFileType("");
      setFileSize("");
      setUploadDateTime("");
      setFile(null);
      setShowModal(false);
      setFile(null);
      setfleg(null);
      setNewfile("");

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
  // const handleDelete = () => {

  // };

  return (
    <>
     <div
        className="mx-2 pb-11 pt-3 px-3 mb-6 rounded-md mt-8 xl:mt-0 lg:mt-0 md:mt-0 2xl:mt-0 4k:mt-0 2k:mt-0 "
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="xl:mb-4 md:mb-4 2xl:mb-4 lg:mb-4 4k:mb-4 2k:mb-4 mb-6 block xl:flex lg:flex md:flex 2xl:flex 4k:flex 2k:flex">
          <div className="w-[100%] xl:w-[80%] lg:w-[80%] md:w-[80%] 2xl:w-[80%] 4k:w-[80%] 2k:w-[80%] relative mb-2 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
            <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500]">
              Number of  hours of training provided to employees
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e1`}
                data-tooltip-content="This section documents the data corresponding to the average hours of training
                that the organization’s employees have undertaken during the reporting period,
                by gender and employee category."
                className="mt-1.5 ml-2 text-[15px]"
              />
              <ReactTooltip
                id={`tooltip-$e1`}
                place="top"
                effect="solid"
                style={{
                  width: "290px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                  textAlign: "left",
                }}
              ></ReactTooltip>
            </h2>
          </div>
          <div className="w-[100%] xl:w-[20%]  lg:w-[20%]  md:w-[20%]  2xl:w-[20%]  4k:w-[20%]  2k:w-[20%] h-[26px] mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0  ">
            <div className="flex xl:float-end lg:float-end md:float-end 2xl:float-end 4k:float-end 2k:float-end float-start gap-2 mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
              <div className="w-[80px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 404-1a
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2">
          <Form
            schema={r_schema}
            uiSchema={r_ui_schema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}
            formContext={{
              onRemove: handleRemoveCommittee,
            }}
          />
        </div>
        {(togglestatus === "Corporate" && selectedCorp) ||
        (togglestatus !== "Corporate" && selectedOrg && year) ? (
          <div className="-mt-14 float-end">
            {selectedOrg && year && (
              <div className="flex right-1 mx-2 ">
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                {fileName ? (
                  <label className="flex cursor-pointer float-end">
                    <div
                      className="flex items-center text-center mt-2"
                      onClick={handlePreview}
                    >
                      <MdFilePresent className="w-6 h-6 mr-1 text-green-500 " />
                      <div className="w-[150px] truncate  text-sky-600 text-sm">
                        {fileName}
                      </div>
                    </div>
                  </label>
                ) : (
                  <label
                    htmlFor="fileInput"
                    className="flex cursor-pointer ml-1 mb-4"
                  >
                    <div className="flex items-center mt-2 ">
                      <MdOutlineFileUpload className="w-6 h-6 mr-1 text-[#007EEF]" />
                      <div className="w-[150px] truncate text-[#007EEF] text-[13px] ml-1 ">
                        Upload Documentation
                      </div>
                    </div>
                  </label>
                )}
              </div>
            )}
          </div>
        ) : null}

        <div className="mt-4">
          <button
            type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
              (!selectedCorp && togglestatus === "Corporate") ||
              !selectedOrg ||
              !year ||
              !month
                ? "cursor-not-allowed opacity-90"
                : ""
            }`}
            onClick={buttonClickHandler}
            disabled={
              (togglestatus === "Corporate" && !selectedCorp) ||
              (togglestatus !== "Corporate" &&
                (!selectedOrg || !year || !month))
            }
          >
            Submit
          </button>
        </div>
        {/* <div className="mt-4">
          <button
            type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
              !selectedOrg || !year || !month ? "cursor-not-allowed" : ""
            }`}
            onClick={buttonClickHandler}
            disabled={!selectedOrg || !year || !month}
          >
            Submit
          </button>
        </div> */}
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
      {showModal && (
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
            <div className="block justify-between xl:flex lg:flex d:flex  2xl:flex  4k:flex  2k:flex ">
                <div className="relative w-[105vw] xl:w-[55vw] lg:w-[55vw] 2xl:w-[55vw] 4k:w-[55vw] 2k:w-[55vw] h-[115vw] xl:h-[45vw] lg:h-[45vw] 2xl:h-[45vw] 4k:h-[45vw] 2k:h-[45vw]">
                {fleg ? (
                  fileType.startsWith("image") ? (
                    <img
                      src={newfile}
                      alt="Preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : fileType === "application/pdf" ? (
                    <iframe
                      src={newfile}
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

              <div className="w-[211px] mx-2 xl:mx-0 lg:mx-0 md:mx-0 2xl:mx-0 4k:mx-0 2k:mx-0">
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
    </>
  );
};

export default Screen1;
