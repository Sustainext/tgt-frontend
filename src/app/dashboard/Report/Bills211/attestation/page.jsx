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
import {
  setApprovalattestationpart1,
  setApprovalattestationpart2,
} from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { Oval } from "react-loader-spinner";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BlobServiceClient } from "@azure/storage-blob";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Attestation = forwardRef(({ orgName, data, reportId }, ref) => {
  const [loopen, setLoOpen] = useState(false);
  const [part1, setPart1] = useState("");
  const [part2, setPart2] = useState("");
  const [imageviw, setImageview] = useState("");
  const [selectedfile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const isMounted = useRef(true);

  const content = useSelector(
    (state) => state.BillScreen1About.approval_attestation_part1
  );
  const content2 = useSelector(
    (state) => state.BillScreen1About.approval_attestation_part2
  );
  const text1 = useSelector((state) => state.header.headertext1);
  const text2 = useSelector((state) => state.header.headertext2);
  const middlename = useSelector((state) => state.header.middlename);
  const dispatch = useDispatch();

  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);

  const loadContent = () => {
    const defaultPart1 = `<p style="margin-bottom: 8px;">
      I attest that the information in this report is true, accurate, and complete in all material respects for the purposes of the Act, for the reporting year stated above.
    </p>
    <p>I have the authority to bind ${orgName || "[Company Name]"}</p>`;

    dispatch(setApprovalattestationpart1(defaultPart1));
    setPart1(defaultPart1);
  };

  const loadContent2 = () => {
    const defaultPart2 = `<p style="margin-bottom: 8px;">
      This report was approved by ${
        orgName || "[Company Name]"
      } Board of Directors on [date] and is signed by:
    </p>
    <p>[Name]</p>
    <p>[Title/Designation]</p>
    <p>${orgName || "[Company Name]"}</p>
    <p>[Date]</p>`;

    dispatch(setApprovalattestationpart2(defaultPart2));
    setPart2(defaultPart2);
  };

  const config = {
    enter: "BR",
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
      await blobClient.uploadData(blob, {
        blobHTTPHeaders: { blobContentType: file.type },
      });
      return `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
    } catch (error) {
      console.error("Azure upload error:", error.message);
      return null;
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    let errorMessages = "";

    if (!file) return;
    if (file.type !== "image/png") {
      errorMessages = "Only PNG images are allowed.";
    } else if (file.size > 1048576) {
      errorMessages = "Maximum file size allowed is 1MB";
    } else {
      const url = await uploadFileToAzure(file, file.name);
      if (url) setImageview(url);
      else errorMessages = "Failed to upload image.";
    }

    setError(errorMessages);
  };

  const handleFileCancel = () => {
    setSelectedFile(null);
    setImageview("");
    setError("");
  };

  const fetchDatareport = async () => {
    try {
      dispatch(setApprovalattestationpart1(""));
      dispatch(setApprovalattestationpart2(""));
      setSelectedFile(null);
      setImageview("");
      LoaderOpen();

      const response = await axiosInstance.get(
        "/canada_bill_s211/v2/get-report-data",
        {
          params: { report: reportId, screen: 12 },
        }
      );

      setImageview(response.data.report_data.company_logo || "");
      if (response.data.report_data.file_name) {
        setSelectedFile({ name: response.data.report_data.file_name });
      }

      const reportData =
        response?.data?.report_data?.approval_attestation_part1;
      const reportData2 =
        response?.data?.report_data?.approval_attestation_part2;

      if (reportData) {
        dispatch(setApprovalattestationpart1(reportData));
        setPart1(reportData);
      }

      if (reportData2) {
        dispatch(setApprovalattestationpart2(reportData2));
        setPart2(reportData2);
      }
    } catch (error) {
      console.error("Error fetching attestation data:", error);
    } finally {
      LoaderClose();
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      fetchDatareport();
      isMounted.current = false;
    }
  }, []);

  useImperativeHandle(ref, () => ({
    async submitForm() {
  

      try {
        const payload = {
          report: reportId,
          screen: 12,
          data: {
            approval_attestation_part1: content,
            approval_attestation_part2: content2,
            company_logo: imageviw || "",
            file_name: selectedfile?.name || "",
          },
        };

        const response = await axiosInstance.put(
          "/canada_bill_s211/v2/create-report-data/",
          payload
        );

        if (response.status === 200) {
          toast.success("Data saved successfully!", {
            position: "top-right",
            autoClose: 3000,
            theme: "light",
          });
          return true;
        }
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("Failed to save the data.", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      }
      return false;
    },
  }));

  const fileInputRef = useRef(null);
  const handleButtonClick = () => fileInputRef.current.click();

  const handleEditorChange = (value) => {
    dispatch(setApprovalattestationpart1(value));
    setPart1(value);
  };
  const handleEditorChange2 = (value) => {
    dispatch(setApprovalattestationpart2(value));
    setPart2(value);
  };

  return (
    <>
      <h3 className="text-[22px] text-[#344054] mb-4 font-semibold">
        Approval and Attestation
      </h3>

      {/* Part 1 */}
      <div className="flex justify-between items-center">
        <div className="w-[85%]">
          <p className="text-[15px] text-[#344054] mb-4 mt-3">
            Add a statement confirming that the approving member has the legal
            authority to bind the entity.
          </p>
        </div>
        <button
          className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex h-[35px]"
          onClick={loadContent}
        >
          <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
          Auto Fill
        </button>
      </div>

      <JoditEditor
        value={content}
        config={config}
        tabIndex={1}
        onBlur={handleEditorChange}
      />

      {/* Signature */}
      <div className={`${imageviw ? "block" : "flex"} gap-4 mb-4 mt-3`}>
        <p className="text-[15px] text-[#344054] mb-2">Signature:</p>
        {imageviw && (
          <img
            src={imageviw}
            alt="logo"
            className="w-[150px] h-[150px] object-cover rounded-md mb-4"
          />
        )}
        <div className="flex">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
            accept="image/png"
          />
          {selectedfile?.name ? (
            <div className="flex items-center mt-2 relative">
              <div className="truncate text-sky-600 text-sm flex">
                <MdFilePresent className="w-6 h-6 mr-2 text-green-500" />
                {selectedfile.name}
              </div>
              <MdCancel
                className="w-4 h-4 text-gray-500 cursor-pointer absolute right-[-15px] top-[-2px]"
                onClick={handleFileCancel}
              />
            </div>
          ) : (
            <button
              onClick={handleButtonClick}
              className="flex text-[#007EEF] text-[15px] rounded-md ml-2"
            >
              <MdOutlineFileUpload
                className="mt-1"
                style={{ fontSize: "16px" }}
              />
              <p className="ml-2">Upload Image</p>
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      </div>

      {/* Part 2 */}
      <div className="flex justify-between items-center">
        <div className="w-[85%]">
          <p className="text-[15px] text-[#344054] mb-4 mt-3">
            Note: In the case of a report submitted on behalf of a single
            entity, the report must be approved by the entity's governing body.
            The approval must be evidenced by a statement that indicates it was
            approved by its governing body and includes the signature of one or
            more members of the governing body.
          </p>
          <p className="text-[15px] text-[#344054] mb-4 mt-3">
            In the case of a joint report, however, the approval must be
            evidenced by a statement that states whether it was approved by the
            governing body of each entity included in the report or by the
            governing body of the entity, if any, that controls each entity
            included in the report, and include the signature of one or more
            members of the governing body(ies). It is up to each entity to
            determine the appropriate governing body or bodies to approve the
            report.
          </p>
        </div>
        <button
          className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex h-[35px]"
          onClick={loadContent2}
        >
          <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
          Auto Fill
        </button>
      </div>

      <JoditEditor
        value={content2}
        config={config}
        tabIndex={1}
        onBlur={handleEditorChange2}
      />

      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval
            height={50}
            width={50}
            color="#00BFFF"
            secondaryColor="#f3f3f3"
          />
        </div>
      )}
    </>
  );
});

export default Attestation;
