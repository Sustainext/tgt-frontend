"use client";
import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { MdFilePresent, MdCancel, MdOutlineFileUpload } from "react-icons/md";
import STARSVG from "../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setAboutTheReport } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { Oval } from "react-loader-spinner";
import dynamic from "next/dynamic";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BlobServiceClient } from "@azure/storage-blob";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Aboutthereport = forwardRef(({reportId }, ref) => {
  const [loopen, setLoOpen] = useState(false);
  const [p1q2, setP1q2] = useState("");
  const isMounted = useRef(true);
  const [imageviw, setImageview] = useState("");
  const [selectedfile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  console.log(reportId,"test reportId");
  // const reportId = useSelector(
  //   (state) => state.BillScreen1About.report_id
  // );
  const content = useSelector(
    (state) => state.BillScreen1About.about_the_Report
  );
  const text1 = useSelector((state) => state.header.headertext1);
  const text2 = useSelector((state) => state.header.headertext2);
  const middlename = useSelector((state) => state.header.middlename);
  const dispatch = useDispatch();
  console.log(selectedfile, "test selectedfile");
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const loadContent = () => {
    dispatch(setAboutTheReport(p1q2));
  };

  const config = {
    enter: "BR", // Or customize behavior on Enter key
    cleanHTML: true,
    enablePasteHTMLFilter: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    style: {
      fontSize: "14px",
      color: "#667085",
    },
    allowResizeY: false,
    defaultActionOnPaste: "insert_clear_html",
    toolbarSticky: false,
    toolbar: true,
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "align",
      "outdent",
      "indent",
      "ul",
      "ol",
      "paragraph",
      "link",
      "table",
      "undo",
      "redo",
      "hr",
      "fontsize",
      "selectall",
    ],
    removeButtons: [
      "fullsize",
      "preview",
      "source",
      "print",
      "about",
      "find",
      "changeMode",
      "paintFormat",
      "image",
      "brush",
      "font",
    ],
  };
  const fetchDatareport = async () => {
    try {
      dispatch(setAboutTheReport(""));
      setSelectedFile(null);
      setImageview("");
      LoaderOpen();

      const response = await axiosInstance.get(
        "/canada_bill_s211/v2/get-report-data",
        {
          params: {
            report: reportId,
            screen: 1,
          },
        }
      );

      const reportData = response?.data?.report_data?.about_the_report;
      if (reportData) {
        // Use the existing filled content from API
        dispatch(setAboutTheReport(reportData));
        setP1q2(reportData);
        setImageview(response.data.report_data.company_logo);
        setSelectedFile({ name: response.data.report_data.file_name });
      } else {
        // Use default template if no data found
        const companyName =
          response?.data?.part_1_screen1_q2 || "[Company Name – P1-Q2]";
        const year = response?.data?.part_1_screen1_q3 || "[Year – P1-Q3]";
        const date_from =
          response?.data?.part_1_screen1_form_q4 || "[Start Date – Q4]";
        const date_to =
          response?.data?.part_1_screen1_to_q4 || "[End Date – Q4]";
        const formattedFromDate = moment(date_from).format("MMMM D, YYYY");
        const formattedToDate = moment(date_to).format("MMMM D, YYYY");

        const filledContent = `<p>This report is prepared in compliance with the Fighting Against Forced Labour and Child Labour in Supply Chains Act (Bill S-211). It provides transparency on ${companyName} structure, activities, and supply chains, as well as its policies and due diligence measures to prevent the use of forced labour and child labour. The report outlines identified risks, remediation measures, training initiatives, and assessment processes to ensure responsible business practices. This report corresponds to the ${year} reporting year, covering the financial year from ${formattedFromDate} to ${formattedToDate}.</p>`;

        setP1q2(filledContent);
        setImageview(response.data.report_data.company_logo);
        setSelectedFile({ name: response.data.report_data.file_name });
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      LoaderClose();
    }
  };

useEffect(() => {
  if (reportId) {
    fetchDatareport();
  }
}, [reportId]);

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
  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    setSelectedFile(e.target.files[0]);

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
  const handleFileCancel = () => {
    setSelectedFile(null);
    setImageview("");
    setError("");
    setTimeout(() => {
      LoginlogDetails("Success", "Deleted");
    }, 500);
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
  const handleEditorChange = (value) => {
    dispatch(setAboutTheReport(value));
    setP1q2(value);
  };

  useImperativeHandle(ref, () => ({
    async submitForm(type) {
      try {
    
        const payload = {
          report: reportId,
          screen: 1,
          data: {
            about_the_report: p1q2,
            company_logo: imageviw || "",
            file_name: selectedfile.name || "",
          },
        };

        const response = await axiosInstance.put(
          "/canada_bill_s211/v2/create-report-data/",
          payload
        );

        // ✅ Check for status 200 and show toast
        if (response.status === 200) {
          toast.success("Data saved successfully!", {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: true,
            closeOnClick: true,
            theme: "light",
          });
        }

        return true;
      } catch (error) {
        console.error("Error submitting About the Report:", error);

        // Optional: error toast
        toast.error("Failed to save About the Report.", {
          position: "top-right",
          autoClose: 3000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "light",
        });

        return false;
      }
    },
  }));
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <>
      <div>
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          About the Report
        </h3>
      </div>
      <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between items-center">
        <p className="text-[15px] text-[#344054] mb-4 mt-3">
          Add Introduction about the Report
        </p>
        <button
          className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex h-[35px]"
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
     <div className={`${imageviw ? "block" : "flex"} gap-4 mb-4`}>
        <p className="text-[15px] text-[#344054] mb-2">Upload Company Logo:</p>
        {imageviw && imageviw !== "undefined" && (
          <div className="mb-4">
            <img
              src={imageviw}
              alt="logo"
              className="w-[150px] h-[150px] object-cover rounded-md"
            />
          </div>
        )}
        <div className="flex ">
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
              className="flex bg-transparent  text-center text-[#007EEF] text-[15px] rounded-md ml-2"
            >
              <p>
                <MdOutlineFileUpload
                  className="mt-1"
                  style={{ fontSize: "16px" }}
                />
              </p>
              <p className="ml-2">Upload Image</p>
            </button>
          )}
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
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

export default Aboutthereport;
