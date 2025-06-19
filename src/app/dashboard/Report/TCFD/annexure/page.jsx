"use client";
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import dynamic from "next/dynamic";
import Image from "next/image";
import STARSVG from "../../../../../../public/star.svg";
import axiosInstance from "../../../../utils/axiosMiddleware";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Annexure = forwardRef(({ onSubmitSuccess }, ref) => {
  const orgName =
    typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
  const reportid =
    typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  
  const apiCalledRef = useRef(false);
  const [data, setData] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [annexureContent, setAnnexureContent] = useState("");
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    submitForm,
  }));

  // Jodit Editor configuration
  const config = {
    readonly: false,
    placeholder: "Add any additional information, appendices, or supporting documents here.",
    height: 400,
    toolbarSticky: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'font', 'fontsize', '|',
      'align', '|',
      'undo', 'redo'
    ],
  };

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const loadAutoFillContent = () => {
    const autoFillContent = `<h3>Annexure</h3>
<p>This annexure provides additional supporting information and documentation related to our TCFD disclosures.</p>

<h4>A. Methodology and Data Sources</h4>
<p>Our climate-related data collection and analysis follows established industry standards and best practices. Key methodologies include:</p>
<ul>
<li>GHG Protocol Corporate Accounting and Reporting Standard</li>
<li>TCFD Recommendations and Guidance</li>
<li>Science-Based Targets methodology</li>
</ul>

<h4>B. Definitions and Glossary</h4>
<p><strong>Climate-related risks:</strong> Physical risks and transition risks related to climate change that could impact the organization.</p>
<p><strong>Physical risks:</strong> Event-driven (acute) and longer-term shifts (chronic) in climate patterns.</p>
<p><strong>Transition risks:</strong> Risks related to the transition to a lower-carbon economy.</p>

<h4>C. Additional Resources</h4>
<p>For more information on our sustainability initiatives and climate commitments, please visit our corporate website or contact our sustainability team.</p>`;
    
    setAnnexureContent(autoFillContent);
  };

  const handleEditorChange = (content) => {
    setAnnexureContent(content);
  };

  const submitForm = async (type) => {
    LoaderOpen();
    
    const data = {
      annexure_content: {
        page: "annexure",
        label: "9. Annexure",
        subLabel: "Additional Information and Appendices",
        type: "textarea",
        content: annexureContent,
        field: "annexure_content",
        isSkipped: false,
      },
    };

    const url = `${process.env.BACKEND_API_URL}/tcfd_report/annexure/${reportid}/`;
    try {
      const response = await axiosInstance.put(url, data);

      if (response.status === 200) {
        if (type === "next") {
          toast.success("Annexure completed successfully", {
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
    setAnnexureContent("");
    
    const url = `${process.env.BACKEND_API_URL}/tcfd_report/annexure/${reportid}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.data) {
        setData(response.data);
        setAnnexureContent(response.data.annexure_content?.content || "");
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
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          9. Annexure
        </h3>

        {/* <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between mb-4">
          <p className="text-[15px] text-[#667085] mb-2 mt-3">
            Add any additional information, appendices, or supporting documents here.
          </p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadAutoFillContent}
          >
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>

        <div className="mb-6">
          <JoditEditor
            ref={editorRef}
            value={annexureContent}
            config={config}
            tabIndex={1}
            onBlur={handleEditorChange}
            onChange={() => {}}
          />
        </div> */}

        {/* Risk Terminology Used Section */}
        <div className="mb-8">
          <h4 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            Risk Terminology Used
          </h4>
          
          <div className="mb-6 bg-blue-50 p-4 rounded border">
            <p className="text-blue-600 text-sm mb-2">
              (Response "Provide definitions of risk terminology used or references to existing risk classification frameworks used" field group, without heading) ------------------------------------------------------------.
            </p>
            <div className="text-sm text-gray-700">
              {data.risk_terminology || "Risk terminology definitions and framework references will be displayed here based on API response."}
            </div>
          </div>

          <div className="mb-6 bg-blue-50 p-4 rounded border">
            <p className="text-blue-600 text-sm mb-2">
              Fetch document uploaded for the above-mentioned question.
            </p>
            <div className="text-sm text-gray-700">
              {data.risk_terminology_document ? (
                <div className="mt-2">
                  <p className="font-medium">Uploaded Document:</p>
                  <a 
                    href={data.risk_terminology_document.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {data.risk_terminology_document.name}
                  </a>
                </div>
              ) : (
                "No document uploaded for risk terminology."
              )}
            </div>
          </div>
        </div>

        {/* <div className="bg-gray-50 p-4 rounded border">
          <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
            Common Annexure Content
          </h4>
          <p className="text-sm text-gray-700 mb-2">
            Typical annexure sections for TCFD reports may include:
          </p>
          <ul className="text-sm text-gray-700 list-disc ml-6 space-y-1">
            <li>Detailed methodology and calculation approaches</li>
            <li>Data sources and verification processes</li>
            <li>Glossary of terms and definitions</li>
            <li>Additional data tables and charts</li>
            <li>Third-party assurance statements</li>
            <li>References to external frameworks and standards</li>
            <li>Contact information for inquiries</li>
          </ul>
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
    </>
  );
});

Annexure.displayName = "Annexure";

export default Annexure;