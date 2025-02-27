"use client";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
// import axiosInstance from "../../../utils/axiosMiddleware";
import { toast } from "react-toastify";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import * as XLSX from "xlsx";
import { RiDeleteBin6Line } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "../../../../shared/components/ImageUpload";
import { IoMdDownload } from "react-icons/io";
import axiosInstance from "../../../../utils/axiosMiddleware";
import axios from "axios";

const UploadFileModal = ({
  setRefresh,
  refresh,
  isModalOpen,
  setIsModalOpen,
  deleteData,
  selectedRows,
  groupId
}) => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [fileData, setFileData] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [file,setFile]=useState('')
  const [loopen, setLoOpen] = useState(false);

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setFile(file)
    setIsFileUploaded(true)
  };

 

  const handleSubmit = async (file) => {
    if (!file) return;
    LoaderOpen();
  
    try {
      const data = new FormData();
      data.append("csv_file", file);
      data.append("group", groupId.id);
  
      const url = `${process.env.BACKEND_API_URL}/supplier_assessment/import-stakeholder/`;
      const response = await axiosInstance.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
  
      if (response.status === 200) {
        LoaderClose();
        setFileData(response.data)
        if(response.data.total_incomplete_rows==0){
             toast.success(
                        <div style={{ display: "flex", alignItems: "flex-start" }}>
                          <div className="mt-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="21"
                              viewBox="0 0 20 21"
                              fill="none"
                            >
                              <path
                                d="M10 0.364746C15.5228 0.364746 20 4.8419 20 10.3647C20 15.8876 15.5228 20.3647 10 20.3647C4.47715 20.3647 0 15.8876 0 10.3647C0 4.8419 4.47715 0.364746 10 0.364746ZM14.198 7.4228C13.9811 7.20585 13.6443 7.18174 13.4007 7.35048L13.3141 7.4228L8.75 11.9872L6.69194 9.92889L6.60538 9.85657C6.3618 9.68783 6.02502 9.71193 5.80806 9.92889C5.5911 10.1458 5.56699 10.4826 5.73574 10.7262L5.80806 10.8128L8.30806 13.3128L8.39462 13.3851C8.60775 13.5327 8.89225 13.5327 9.10538 13.3851L9.19194 13.3128L14.198 8.30669L14.2703 8.22013C14.4391 7.97654 14.415 7.63976 14.198 7.4228Z"
                                fill="#54B054"
                              />
                            </svg>
                          </div>
                          <div style={{marginLeft:"15px"}}>
                            <strong
                              style={{
                                display: "block",
                                marginBottom: "4px",
                                fontSize: "16px",
                              }}
                            >
                              {" "}
                              {/* Main heading */}
                              Stakeholders Added
                            </strong>
                            <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.4" }}>
                              {" "}
                              {/* Paragraph aligned below heading */}
                              {`Stakeholders has been imported into the ${groupId?groupId?.name:''} stakeholder group`}
                            </p>
                          </div>
                        </div>,
                        {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          style: {
                            borderRadius: "8px",
                            border: "1px solid #E5E5E5",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            width: "371px",
                          },
                          icon: false,
                        }
                      );
                      setRefresh((prevRefresh) => !prevRefresh);
                      setIsModalOpen(false)
        }
        else{
            setIsPreviewOpen(true)
        }
       
      } else {
        LoaderClose();
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (e) {
      LoaderClose();
      console.error(e);
  
      const errorMessage =
        e.response?.data?.detail || "Oops, something went wrong";
  
      // Display the error message using toast
      toast.error(errorMessage, {
        position: "top-right",
        autoClose:5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    
  };

  


  return (
    <>
      {isModalOpen && (
         <div className="fixed inset-0 flex justify-center items-center bg-[#00000080] z-50 mt-12">
          <div className={`relative bg-white p-6 rounded-lg shadow-lg w-[30%] max-w-3xl`}>
                {isPreviewOpen?(
                    <div>
                    <div className="flex gap-2 items-center mb-2">
                    <IoIosWarning className="w-5 h-5 text-[#F98845]" />
                    <h2 className="text-black text-[18px] font-bold">
                    Stakeholders Import Incomplete
                    </h2>
                  </div>
    
                  <p className="text-[#667085] text-[14px] mb-4">
                  Some rows could not be processed.
                  </p>

                  <div className="border-t-2 border-b-2">
                  <p className="flex gap-2 mb-2 mt-2">
                    <span className="text-[#344054] text-[14px] font-semibold">
                    Successful Entries:
                    </span>{" "}
                    <p className="text-[#667085] text-[14px]">
                      {fileData.total_valid_rows}
                    </p>
                  </p>
                  <p className="flex gap-2 mb-2">
                    <span className="text-[#344054] text-[14px] font-semibold">
                    Failed Entries:
                    </span>{" "}
                    <p className="text-[#667085] text-[14px]">
                    {fileData.total_incomplete_rows}
                    </p>
                  </p>
              </div>
              <p className="text-[#667085] text-[14px] mb-4 mt-2">
              Download the log to view full details
                  </p>
    
                  <div className="flex justify-center items-center mt-6">
                    <a href={fileData.incomplete_file_url}>
                    <button
                    onClick={()=>{
                        setRefresh((prevRefresh) => !prevRefresh);
                      setIsModalOpen(false)
                      setIsPreviewOpen(false)
                    }}
                      type="button"
                      className={`bg-transparent flex gap-2 cursor-pointer border border-gray-300 text-[#727272] px-6 py-2 rounded-md`}
                    >
                         <MdOutlineFileDownload className="w-5 h-5"/>
                     Download Log and Exit
                    </button>
                    </a>
                   
                  </div>
                    </div>
                ):(
                    <div>
                <div className="flex justify-between items-center mb-2">
                <h2 className="text-black text-[18px] font-bold">
                  Import Stakeholders list
                </h2>

                <button
                  className="absolute top-6 right-4 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setIsPreviewOpen(false)
                    setIsModalOpen(false);
                  }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <p className="text-[#667085] text-[14px] mb-4">
                Import Stakeholders to the table from Excel or CSV file
              </p>

              <div>
                <p className="text-[#667085] text-[14px] mb-1">
                  Upload Document
                </p>
                <ImageUpload
                  format={"CSV"}
                  accept=".csv"
                  onFileSelect={handleFileUpload}
                  setIsFileUploaded={setIsFileUploaded}
                />
                <a href="https://sustainextstorage1.blob.core.windows.net/media/supplier_assessment/Stakeholder_List_Template.csv">
                <button className="text-[14px] text-[#007EEF] font-meduim flex justify-start w-full mt-2">
                  <IoMdDownload className=" mt-0.5 mr-1 w-4 h-4" /> Download
                  Template
                </button>
                </a>
                
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => handleSubmit(file)}
                  disabled={!isFileUploaded}
                  className={`bg-blue-500 ${
                    !isFileUploaded
                      ? "opacity-30 cursor-not-allowed"
                      : "cursor-pointer"
                  } text-white px-6 py-2 rounded-md hover:bg-blue-600`}
                >
                  Continue
                </button>
              </div>
                </div>
                )}
                
             
            </div>
          </div>
      )}

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
    </>
  );
};

export default UploadFileModal;
