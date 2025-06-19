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
import STARSVG from "../../../../../../public/star.svg";
import axiosInstance from "../../../../utils/axiosMiddleware";
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

  const orgName =
    typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
  const reportid =
    typeof window !== "undefined" ? localStorage.getItem("reportid") : "";

  const apiCalledRef = useRef(false);
  const [data, setData] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [signatureFile, setSignatureFile] = useState(null);

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

  const loadAutoFillContent = () => {
    console.log('Autofill Clicked!');
    
    const autoFillContent = `<p>At [Company Name], we recognize that climate change is not just an environmental issue—it is a strategic business risk and opportunity that affects our stakeholders, operations, and future resilience. As part of our commitment to long-term value creation, we are proud to present our TCFD report aligned with the recommendations of the Task Force on Climate-related Financial Disclosures (TCFD).</p>
<br/>
<p>The TCFD framework has helped us deepen our understanding of how climate-related risks and opportunities intersect with our business strategy and financial planning. In this report, we outline how [Company Name] is identifying, assessing, and managing climate-related risks, while also seizing opportunities that support our transition toward a low-carbon economy.</p>
<br/>
<p>Our leadership team plays an active role in the governance of climate-related matters. We have integrated climate considerations into our governance structures, risk management practices, and strategic decision-making. This ensures we are well-positioned to address evolving regulatory requirements, physical climate risks, and shifting market expectations.</p>
<br/>
<p>We invite our investors, customers, employees, and partners to explore this report and join us in building a more resilient, sustainable future. Together, we can turn today's risks into tomorrow's opportunities.</p>
<br/>
<p><strong>[Full Name]</strong><br>
<strong>[Title: CEO/Chairman/MD]</strong><br>
<strong>[Company Name]</strong></p>`;

    dispatch(setMessageContent(autoFillContent));
  };

  const handleEditorChange = (content) => {
    dispatch(setMessageContent(content));
  };

  const handleSignatureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSignatureFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(setSignatureUrl(e.target.result));
      };
      reader.readAsDataURL(file);
    }
  };

  const submitForm = async (type) => {
    LoaderOpen();

    const formData = new FormData();
    formData.append("message_content", messageCEO.messageContent);
    if (signatureFile) {
      formData.append("signature", signatureFile);
    }

    const data = {
      message_content: {
        page: "message_ceo",
        label: "1. Message From CEO/MD/Chairman",
        subLabel: "Add message from CEO/MD/Chairman",
        type: "textarea",
        content: messageCEO.messageContent,
        field: "message_content",
        isSkipped: false,
      },
    };

    // For now, we'll use the JSON approach. In a real implementation,
    // you might want to handle file uploads separately
    const url = `${process.env.BACKEND_API_URL}/tcfd_report/message_ceo/${reportid}/`;

    try {
      const response = await axiosInstance.put(url, data);

      if (response.status === 200) {
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

  const loadFormData = async () => {
    LoaderOpen();
    dispatch(setMessageContent(""));
    dispatch(setSignatureUrl(""));

    const url = `${process.env.BACKEND_API_URL}/tcfd_report/message_ceo/${reportid}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.data) {
        setData(response.data);
        dispatch(
          setMessageContent(response.data.message_content?.content || "")
        );
        // Handle signature loading if it exists
        if (response.data.signature_url) {
          dispatch(setSignatureUrl(response.data.signature_url));
        }
      }
      LoaderClose();
    } catch (error) {
      console.error("API call failed:", error);
      LoaderClose();
    }
  };

  useEffect(() => {
    // Ensure API is only called once
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
                value={messageCEO?.messageContent}
                config={config}
                tabIndex={1}
                onBlur={handleEditorChange}
                onChange={() => {}} // We handle changes in onBlur to avoid performance issues
              />
            </div>

            <div className="mb-4">
              <p className="text-[15px] text-[#344054] mb-2 font-semibold">
                Upload Signature Image:
              </p>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <label
                  htmlFor="signature-upload"
                  className="text-blue-500 text-sm cursor-pointer hover:underline"
                >
                  Upload Image
                </label>
                <input
                  id="signature-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleSignatureUpload}
                  className="hidden"
                />
              </div>
              {messageCEO.signatureUrl && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">
                    Signature Preview:
                  </p>
                  <img
                    src={messageCEO.signatureUrl}
                    alt="Signature Preview"
                    className="max-w-[200px] max-h-[100px] border border-gray-300 rounded"
                  />
                </div>
              )}
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
