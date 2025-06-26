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
  const [data, setData] = useState({});
  const [tcfdCollectData, setTcfdCollectData] = useState({});
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

  // Helper function to render file information
  const renderFileInfo = (fileData) => {
    if (fileData && typeof fileData === 'object' && fileData.fileName) {
      return (
        <div className="mt-2 p-3 bg-gray-50 rounded border">
          <div className="text-sm">
            <strong>Attached Document:</strong> {fileData.fileName}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            File type: {fileData.filetype} | Size: {Math.round(fileData.filesize / 1024)} KB
          </div>
          {fileData.fileURL && (
            <a 
              href={fileData.fileURL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm underline mt-2 inline-block"
            >
              View Document
            </a>
          )}
        </div>
      );
    }
    return null;
  };

  const submitForm = async (type) => {
    LoaderOpen();

    const formData = new FormData(); // Fixed typo: was 'formdata'
    formData.append('report', reportid);
    formData.append('screen_name', 'annexure');
    
    const dataPayload = {
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
    
    formData.append('data', JSON.stringify(dataPayload));

    const url = `${process.env.BACKEND_API_URL}/tcfd_framework/report/upsert-tcfd-report/`;

    try {
      const response = await axiosInstance.put(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
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
    
    const url = `${process.env.BACKEND_API_URL}/tcfd_framework/report/get-tcfd-report-data/${reportid}/annexure/`;
    try {
      const response = await axiosInstance.get(url);
      
      if (response.data && response.data.data) {
        console.log("Annexure response.data", response.data);
        
        // Handle both report_data and tcfd_collect_data
        const reportData = response.data.data.report_data || {};
        const tcfdData = response.data.data.tcfd_collect_data || {};
        
        setData(reportData);
        setTcfdCollectData(tcfdData);
        setAnnexureContent(reportData?.annexure_content?.content || "");
        
        console.log("Annexure TCFD Collect Data:", tcfdData);
      } else {
        setData({});
        setTcfdCollectData({});
      }
      LoaderClose();
    } catch (error) {
      console.error("API call failed:", error);
      setData({});
      setTcfdCollectData({});
      LoaderClose();
    }
  };

  // Extract risk terminology data from tcfdCollectData
  const riskTerminologyData = tcfdCollectData?.size_scope_of_risk?.[0] || {};

  // Helper function to render array values
  const renderArrayValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value || '';
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

        {/* Risk Terminology Used Section */}
        <div className="mb-8">
          <h4 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            Risk Terminology Used
          </h4>
          
          {/* <div className="mb-6">
            <div className="text-sm">
              {renderArrayValue(riskTerminologyData?.Q1)}
            </div>
          </div> */}

          <div className="mb-6">
            {/* <div className="text-sm">
              Fetch document uploaded for the above-mentioned question.
            </div> */}
            {riskTerminologyData?.Q2 && (
              <div className="mt-3">
                {typeof riskTerminologyData.Q2 === 'object' && riskTerminologyData.Q2.text ? (
                  <div>
                    <div className="mb-2">{riskTerminologyData.Q2.text}</div>
                    {renderFileInfo(riskTerminologyData.Q2)}
                  </div>
                ) : (
                  <div>{renderArrayValue(riskTerminologyData.Q2)}</div>
                )}
              </div>
            )}
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

Annexure.displayName = "Annexure";

export default Annexure;