"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { MdOutlineFileUpload, MdOutlinePlaylistAdd, MdFilePresent, MdCancel } from "react-icons/md";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { setMessage, setMessageimage } from "../../../../../../lib/redux/features/ESGSlice/screen1Slice";
import { BlobServiceClient } from "@azure/storage-blob";
import axiosInstance from "@/app/utils/axiosMiddleware";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section1 = ({ 
  orgName, 
  selectedfile, 
  setSelectedFile,
  sectionNumber = "1",
  sectionOrder = 1
}) => {
  const content = useSelector(state => state.screen1Slice.message);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const imagePreview = useSelector(state => state.screen1Slice.message_image); 
  const [imageviw, setImageview] = useState("");
  const text1 = useSelector((state) => state.header.headertext1);
  const text2 = useSelector((state) => state.header.headertext2);
  const middlename = useSelector((state) => state.header.middlename);
  const useremail = typeof window !== 'undefined' ? localStorage.getItem("userEmail") : '';
  const roles = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem("textcustomrole")) || '' 
    : '';

  const uploadFileToAzure = async (file, newFileName) => {
    // Read file content as ArrayBuffer
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

  const loadContent = () => {
    dispatch(setMessage(`
      <p>At ${orgName ? orgName : "[Company Name]"}, our commitment to sustainability and responsible business practices is deeply rooted in our mission and values. As a leading manufacturing company, we recognize our role in driving positive environmental, social, and governance (ESG) impacts. This ESG report, aligned with the Global Reporting Initiative (GRI) standards, marks a significant milestone in our journey towards greater transparency and accountability. 
       <br/>
       Environmental Stewardship
       <br/>
       The industrial sector plays a critical role in addressing climate change and environmental degradation. At ${orgName ? orgName : "[Company Name]"}, we have implemented
       <br/>
       Social Responsibility<br/>
       People are at the heart of our success. We are dedicated to fostering a diverse, inclusive, and equitable workplace where all employees feel valued and empowered
       <br/>
       Governance and Ethical Conduct <br/>
       Strong governance is the foundation of our business integrity and long-term success. We have reinforced our governance structures to ensure robust oversight and accountability at all levels of the organization. Our Board of Directors is committed to<br/>
       Looking Ahead <br/>
       As we look to the future, we are committed to further integrating ESG considerations into our core business strategy. We will continue to innovate. <br/>
       Thank you for your continued trust and support. <br/>
      </p>
    `));
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
          setImageview(url);
          dispatch(setMessageimage(url));
        } else {
          errorMessages = "Failed to upload image to Azure.";
        }
   
      } catch (error) {
        LoginlogDetails("Failed", "Uploaded");
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

  const config = {
    enter: "BR", // Or customize behavior on Enter key
  cleanHTML: true,
    enablePasteHTMLFilter: false, 
    askBeforePasteHTML: false, 
    askBeforePasteFromWord: false,
    style: {
      fontSize: "14px",
      color: "#667085"
    },
    allowResizeY: false,
    defaultActionOnPaste: 'insert_clear_html',
    toolbarSticky: false,
    toolbar: true,
    buttons: [
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'align',
      'outdent',
      'indent',
      'ul',
      'ol',
      'paragraph',
      'link',
      'table',
      'undo',
      'redo',
      'hr',
      'fontsize',
      'selectall'
    ],
    removeButtons: ['fullsize', 'preview', 'source', 'print', 'about', 'find', 'changeMode', 'paintFormat', 'image', 'brush', 'font'],
  };


  const handleEditorChange = (value) => {
    dispatch(setMessage(value));
  };

  const handleFileCancel = () => {
    setSelectedFile('')
    setTimeout(() => {
      LoginlogDetails("Success", "Deleted");
    }, 500);
    dispatch(setMessageimage(''));
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

  return (
    <>
      <div className="mb-6">
        {/* <div className="mb-4">
          <h4 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            {sectionNumber} Message from CEO
          </h4>
        </div> */}

        <div>
          <p className="text-[15px] text-[#344054] mb-2">Upload CEO's Image:</p>
          {(imagePreview && imagePreview !== 'undefined') && (
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
            {selectedfile && selectedfile.name ? (
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
            ) : (
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

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
            <p className="text-[15px] text-[#344054] mb-2 mt-3">Add message from CEO</p>
            <button 
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>

          <div className="mb-4">
            <JoditEditor
              value={content}
              config={config}
              tabIndex={1}
              onBlur={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Section1;