"use client";
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import Image from "next/image";
import { MdOutlineFileUpload, MdFilePresent, MdCancel } from "react-icons/md";
import STARSVG from "../../../../../../public/star.svg";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { BlobServiceClient } from "@azure/storage-blob";
import {
  setMessageContent,
  setSignatureUrl,
  selectMessageCEO,
} from "../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const MessageFromCEO = forwardRef(({ onSubmitSuccess }, ref) => {
  const dispatch = useDispatch();
  const messageCEO = useSelector(selectMessageCEO);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const orgName = typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
  const reportid = typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  const useremail = typeof window !== 'undefined' ? localStorage.getItem("userEmail") : '';
  const roles = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("textcustomrole")) || '' : '';

  const apiCalledRef = useRef(false);
  const [data, setData] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [signatureFile, setSignatureFile] = useState(null);
  const [error, setError] = useState("");

  // Jodit Editor configuration
  const config = {
    readonly: false,
    placeholder: "Enter the message from CEO/MD/Chairman here...",
    height: 400,
    toolbarSticky: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "|",
      "align",
      "|",
      "undo",
      "redo",
    ],
  };

  useImperativeHandle(ref, () => ({
    submitForm,
  }));

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  // Get IP Address for logging
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

  // Login logging function
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
        logs: `TCFD Report > Message from CEO > Signature Upload`,
      };
  
      const response = await axiosInstance.post(userDetailsUrl, data);
      return response.data;
    } catch (error) {
      console.error("Error logging details:", error);
      return null;
    }
  };

  // Azure Blob Storage upload function
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

  // Auto fill content function
  const loadAutoFillContent = () => {
    const autoFillContent = `<p>At ${orgName || '[Company Name]'}, we recognize that climate change is not just an environmental issue—it is a strategic business risk and opportunity that affects our stakeholders, operations, and future resilience. As part of our commitment to long-term value creation, we are proud to present our TCFD report aligned with the recommendations of the Task Force on Climate-related Financial Disclosures (TCFD).</p>
<br/>
<p>The TCFD framework has helped us deepen our understanding of how climate-related risks and opportunities intersect with our business strategy and financial planning. In this report, we outline how ${orgName || '[Company Name]'} is identifying, assessing, and managing climate-related risks, while also seizing opportunities that support our transition toward a low-carbon economy.</p>
<br/>
<p>Our leadership team plays an active role in the governance of climate-related matters. We have integrated climate considerations into our governance structures, risk management practices, and strategic decision-making. This ensures we are well-positioned to address evolving regulatory requirements, physical climate risks, and shifting market expectations.</p>
<br/>
<p>We invite our investors, customers, employees, and partners to explore this report and join us in building a more resilient, sustainable future. Together, we can turn today's risks into tomorrow's opportunities.</p>
<br/>
<p><strong>[Full Name]</strong><br>
<strong>[Title: CEO/Chairman/MD]</strong><br>
<strong>${orgName || '[Company Name]'}</strong></p>`;

    dispatch(setMessageContent(autoFillContent));
  };

  // Handle editor change
  const handleEditorChange = (content) => {
    dispatch(setMessageContent(content));
  };

  // Handle signature upload
  const handleSignatureUpload = async (e) => {
    const selectedFile = e.target.files[0];
    setSignatureFile(selectedFile);
    
    let errorMessages = "";
  
    if (!selectedFile) {
      return;
    }
  
    // Validate file type and size
    if (selectedFile.type !== "image/png") {
      errorMessages = "Only PNG images are allowed.";
    } else if (selectedFile.size > 1048576) {
      errorMessages = "Maximum file size allowed is 1MB";
    } else {
      const newFileName = `tcfd_signature_${reportid}_${Date.now()}_${selectedFile.name}`;
  
      try {
        // Upload the file to Azure Blob Storage
        const url = await uploadFileToAzure(selectedFile, newFileName);
    
        if (url) {
          setTimeout(() => {
            LoginlogDetails("Success", "Uploaded");
          }, 500);
          dispatch(setSignatureUrl(url));
        } else {
          errorMessages = "Failed to upload signature to Azure.";
        }
      } catch (error) {
        LoginlogDetails("Failed", "Uploaded");
        console.error("Error uploading signature:", error);
        errorMessages = "An error occurred while uploading the signature.";
      }
    }
  
    setError(errorMessages);
  };

  // Handle button click for file upload
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handle file cancel
  const handleFileCancel = () => {
    setSignatureFile(null);
    setError('');
    setTimeout(() => {
      LoginlogDetails("Success", "Deleted");
    }, 500);
    dispatch(setSignatureUrl(''));
  };

  // Submit form function
  const submitForm = async (type) => {
    LoaderOpen();

    // Get current value from the editor before submitting
    let currentMessageContent = messageCEO.messageContent;
    
    if (editorRef.current && editorRef.current.value) {
      currentMessageContent = editorRef.current.value;
      dispatch(setMessageContent(currentMessageContent));
    }

    const formData = new FormData();
    
    // Add the main message content
    formData.append(
      "message_content",
      JSON.stringify({
        page: "message_ceo",
        label: "1. Message From CEO/MD/Chairman",
        subLabel: "Add message from CEO/MD/Chairman",
        type: "textarea",
        content: currentMessageContent,
        field: "message_content",
        isSkipped: false,
      })
    );

    // Add signature details
    formData.append(
      "signature_url", 
      JSON.stringify({
        page: "message_ceo",
        label: "1. Signature Image",
        subLabel: "CEO/MD/Chairman Signature",
        type: "image",
        content: messageCEO.signatureUrl || "",
        field: "signature_url",
        isSkipped: false,
      })
    );

    // Add signature filename if file exists
    formData.append("signature_filename", signatureFile ? signatureFile.name : "");

    // Add additional required fields
    formData.append("report", reportid);
    formData.append("screen_name", "message_ceo");

    const url = `${process.env.BACKEND_API_URL}/tcfd_framework/report/upsert-tcfd-report/`;

    try {
      const response = await axiosInstance.put(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        if (type === "next") {
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
        }

        if (onSubmitSuccess) {
          onSubmitSuccess(true);
        }
        LoaderClose();
        return true;
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
        return false;
      }
    } catch (error) {
      LoaderClose();
      console.error("Submit error:", error);
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
      return false;
    }
  };

  // Load form data function
  const loadFormData = async () => {
    LoaderOpen();
    dispatch(setMessageContent(""));
    dispatch(setSignatureUrl(""));
    setSignatureFile(null);
    setError("");

    const url = `${process.env.BACKEND_API_URL}/tcfd_framework/report/get-tcfd-report-data/${reportid}/message_ceo/`;
    try {
      const response = await axiosInstance.get(url);

      if (response.data && response.data.data) {
        console.log("Full API Response:", response.data);
        
        const reportData = response.data.data.report_data;
        const additionalData = response.data.data;
        
        setData(reportData);
        
        // Load message content
        if (reportData && reportData.message_content && reportData.message_content.content) {
          console.log("Loading message content:", reportData.message_content.content);
          dispatch(setMessageContent(reportData.message_content.content));
        }
        
        // Load signature information
        if (reportData && reportData.signature_url && reportData.signature_url.content) {
          console.log("Loading signature URL:", reportData.signature_url.content);
          dispatch(setSignatureUrl(reportData.signature_url.content));
          
          // If there's a signature filename, create a mock file object for display
          if (additionalData.signature_filename) {
            console.log("Loading signature filename:", additionalData.signature_filename);
            const mockFile = {
              name: additionalData.signature_filename,
              type: "image/png",
              size: 0
            };
            setSignatureFile(mockFile);
          }
        }
      }
      LoaderClose();
    } catch (error) {
      console.error("API call failed:", error);
      LoaderClose();
    }
  };

  useEffect(() => {
    if (!apiCalledRef.current && reportid) {
      apiCalledRef.current = true;
      loadFormData();
    }
  }, [reportid]);

  return (
    <>
      <div className="mx-2 p-2">
        <div className="flex gap-4">
          <div className="xl:w-[80%] md:w-[75%] lg:w-[80%] 2k:w-[80%] 4k:w-[80%] 2xl:w-[80%] w-full">
            <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
              1. Message from CEO/MD/Chairman
            </h3>

            <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
              <p className="text-[15px] text-[#344054] mb-2 mt-3">
                Add message from CEO/MD/Chairman
              </p>
              <button
                className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
                onClick={loadAutoFillContent}
              >
                <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
                Auto Fill
              </button>
            </div>

            <div className="mb-4">
              <JoditEditor
                ref={editorRef}
                value={messageCEO.messageContent}
                config={config}
                tabIndex={1}
                onBlur={handleEditorChange}
                onChange={() => {}}
              />
            </div>

            <div className="mb-4">
              <p className="text-[15px] text-[#344054] mb-2 font-semibold">
                Upload Signature Image:
              </p>
              
              {messageCEO.signatureUrl && (
                <div className="mb-4">
                  <img 
                    src={messageCEO.signatureUrl} 
                    alt="Signature" 
                    className="max-w-[200px] max-h-[100px] object-contain border border-gray-300 rounded" 
                  />
                </div>
              )}

              <div className="flex gap-4 mt-2 mb-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleSignatureUpload}
                  style={{ display: "none" }}
                  accept="image/png"
                />
                
                {(signatureFile && signatureFile.name) || messageCEO.signatureUrl ? (
                  <label className="flex">
                    <div className="flex items-center text-center mt-2 relative">
                      <div className="truncate text-sky-600 text-sm flex text-center">
                        <MdFilePresent className="w-6 h-6 mr-2 text-green-500" />
                        {signatureFile ? signatureFile.name : "Signature uploaded"}
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
                    <MdOutlineFileUpload className="mt-1" style={{ fontSize: "16px" }} />
                    <span className="ml-2">Upload Signature</span>
                  </button>
                )}
              </div>

              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            </div>
          </div>
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
    </>
  );
});

MessageFromCEO.displayName = "MessageFromCEO";

export default MessageFromCEO;