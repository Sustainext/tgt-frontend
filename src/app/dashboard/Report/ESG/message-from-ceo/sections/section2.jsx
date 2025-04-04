"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { MdOutlineFileUpload, MdFilePresent,MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompanyname,
  setCeoname,
  setSignatureimage,
} from "../../../../../../lib/redux/features/ESGSlice/screen1Slice";
import { BlobServiceClient } from "@azure/storage-blob";
import axiosInstance from "@/app/utils/axiosMiddleware";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section2 = ({ orgName,selectedfile,setSelectedFile }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const companyName = useSelector((state) =>state.screen1Slice.company_name );
  const ceoname = useSelector((state) => state.screen1Slice.ceo_name);
  const imagePreview = useSelector(
    (state) => state.screen1Slice.signature_image
  );
  const text1 = useSelector((state) => state.header.headertext1);
  const text2 = useSelector((state) => state.header.headertext2);
  const middlename = useSelector((state) => state.header.middlename);
  const useremail = typeof window !== 'undefined' ? localStorage.getItem("userEmail") : '';
  const roles = typeof window !== 'undefined' 
  ? JSON.parse(localStorage.getItem("textcustomrole")) || '' 
  : '';

  const handleCompanyname = (e) => {
    dispatch(setCompanyname(e.target.value));
    // setCompanyName(e.target.value)
  };
  const handleCeoname = (e) => {
    dispatch(setCeoname(e.target.value));
    // setCompanyName(e.target.value)
  };
  const uploadFileToAzure = async (file, newFileName) => {
    // Read file content as ArrayBuffer
    console.log(file, " is the file object");
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer]);

    // Azure Storage configuration
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
      // Upload the blob to Azure Blob Storage
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
  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    setSelectedFile(e.target.files[0])
    let errorMessages = "";
  
    if (!selectedFile) {
      return;
    }
  
    if (selectedFile.type !== "image/png") {
      errorMessages = "Only PNG images are allowed.";
    } else if (selectedFile.size > 1048576) {
      errorMessages = "Maximum file size allowed is 1MB";
    } else {
      const newFileName = selectedFile.name;
  
      try {
        // Upload the file to Azure Blob Storage
        const url = await uploadFileToAzure(selectedFile, newFileName);
  
        if (url) {
          setTimeout(() => {
            LoginlogDetails("Success", "Uploaded");
          }, 500);
          dispatch(setSignatureimage(url));
        } else {
          errorMessages = "Failed to upload image to Azure.";
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        errorMessages = "An error occurred while uploading the image.";
      }
    }
  
    setError(errorMessages);
  };
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileCancel=()=>{
    setSelectedFile('')
    setTimeout(() => {
      LoginlogDetails("Success", "Deleted");
    }, 500);
    dispatch(setSignatureimage(''));
  }

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
        event_type: "Report",
        event_details: "File",
        action_type: actionType,
        status: status,
        user_email:useremail,
        user_role:roles,
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
  return (
    <>
      <div>
        <p className="text-[15px] text-[#344054] mb-2">
          Upload Signature Image:
        </p>
        {(imagePreview && imagePreview!=='undefined') && (
          <div className="mb-4">
            <img 
              src={imagePreview} 
              alt="CEO" 
              className="w-[150px] h-[150px] object-cover rounded-md" 
            />
          </div>
        )}
        <div className="flex gap-4 mt-2 mb-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
            accept="image/png"
          />
         {selectedfile && selectedfile.name?(
              <label className="flex">
              <div className="flex items-center text-center mt-2 relative">
                <div className="truncate text-sky-600 text-sm flex text-center">
                  <MdFilePresent className="w-6 h-6 mr-2 text-green-500" />
                  {selectedfile.name}
                </div>
                <div className="absolute right-[-15px] top-[-2px]">
      <MdCancel
        className="w-4 h-4 text-gray-500 cursor-pointer"
        onClick={handleFileCancel}
      />
    </div>
              </div>
            </label>
            
          ):(
            <button
            onClick={handleButtonClick}
            className="flex bg-transparent py-2 text-center text-[#007EEF] text-[15px] rounded-md"
          >
            <p>
              <MdOutlineFileUpload className="mt-1" style={{ fontSize: "16px" }} />
            </p>
            <p className="ml-2">Upload Image</p>
          </button>
          )}
        </div>

      

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <p className="text-[15px] text-[#344054] mb-4">Sincerely,</p>
 
        <p className="text-[15px] text-[#344054] mb-2">CEO’s Name</p>
        <input
          type="text"
          placeholder="Enter CEO’s Name"
          className="border border-gray-300 height-[44px] px-2 py-3 rounded-md text-[13px] w-full bg-white shadow-sm mb-4"
          value={ceoname}
          onChange={handleCeoname}
        />
        <p className="text-[15px] text-[#344054] mb-2">Company Name</p>
        <input
          onChange={handleCompanyname}
          type="text"
          placeholder="Enter Company Name"
          className="border border-gray-300 height-[44px] px-2 py-3 rounded-md text-[13px] w-full bg-white shadow-sm"
          value={companyName}
        />
      </div>
    </>
  );
};

export default Section2;
